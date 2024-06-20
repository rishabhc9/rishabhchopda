var ENTER_KEY = 13;
var fileSystem = {
  'README.md': `Welcome to my portfolio!

Supported commands are:

  - ls: list directory contents
  - cat: concatenate and print files
  - clear: clear the terminal screen 
  - projects: view my latest gitHub repositories
  - publications: view my academic publications
`,

  'about.txt' :`Extremely motivated to constantly develop my skills and grow professionally. I am a passionate technologist with a keen eye for detail and precision. I excel in meticulously designing and implementing robust automation systems using Python, ensuring precision in execution and delivering exceptional performance. Skilled in languages like C, JavaScript, Python, and SQL, I apply my knowledge to practical projects, transforming ideas into effective solutions. Currently, I work at Deloitte, where I leverage my background in computer engineering and passion for technology to drive innovation and make a positive impact.`,
  'skills.txt' : `I Work Well With:
- Python (Flask, Selenium, PyAutoGUI, Scrapy)
- HTML
- CSS
- JavaScript
- PHP
- SQL
- C Language`,
'services.txt' : `Services I Offer:
- Task Scheduling and Workflow Automation
- Excel Automation
- Web Scraping and Crawling
- Telegram and Discord BOTs Development
- Document Generation and Processing
- Bot Detection Bypass and IP Rotations
- Test Automation`
};

function Terminal() {
  this.onKeyDown = this.onKeyDown.bind(this);
  this.clearHistory = this.clearHistory.bind(this);
  this.addHistory = this.addHistory.bind(this);
  this.listFiles = this.listFiles.bind(this);
  this.catFile = this.catFile.bind(this);
  this.scrollToBottom = this.scrollToBottom.bind(this);
  this.fetchGitHubData = this.fetchGitHubData.bind(this);
  this.fetchPublications = this.fetchPublications.bind(this);

  this.history = [];
  this.elements = {
    input: document.querySelector('.input'),
    terminal: document.querySelector('.terminal'),
    outputContainer: document.querySelector('.outputContainer')
  };
  this.prompt = '$';
  this.commands = {
    clear: this.clearHistory,
    ls: this.listFiles,
    cat: this.catFile,
    projects: this.fetchGitHubData,
    publications: this.fetchPublications
  };
  this.elements.input.addEventListener('keydown', this.onKeyDown);
  this.catFile('README.md');
}

Terminal.prototype.clearHistory = function() {
  this.history = [];
  this.elements.outputContainer.innerHTML = '';
};

Terminal.prototype.catFile = function(fileName) {
  if (fileName in fileSystem) 
    this.addHistory(fileSystem[fileName]);
  else 
    this.addHistory('cat: ' + fileName + ': No such file or directory');
};

Terminal.prototype.scrollToBottom = function() {
  this.elements.terminal.scrollTop = this.elements.terminal.scrollHeight;
};

Terminal.prototype.addHistory = function(output) {
  this.history.push(output);
 
  var outputEl = document.createElement('pre');
  outputEl.classList.add('output');
  outputEl.innerHTML = output; // Use innerHTML to render links
  this.elements.outputContainer.appendChild(outputEl);
  this.scrollToBottom();
};

Terminal.prototype.listFiles = function(dir) {
  var output = Object.keys(fileSystem).reduce(function(acc, curr, index) {
    var deliminator = index % 3 === 0 && index !== 0 ? '\n' : '\t';
    return acc + curr + deliminator;
  }, '');
  
  this.addHistory(output);
};

Terminal.prototype.clearInput = function() {
  this.elements.input.value = '';
};

Terminal.prototype.onKeyDown = function(e) {
  // Only respond to Enter key presses
  if (e.keyCode !== ENTER_KEY) return;
  
  var inputText = this.elements.input.value.trim();
  var inputArray = inputText.split(' ');
  var inputCommand = inputArray[0];
  var arg = inputArray.slice(1).join(' '); // Join arguments with spaces

  this.addHistory(this.prompt + ' ' + inputText);
  this.clearInput();
  
  /* If the command line was empty, stop. 
     We don't want to interpret it as a command.
     It's fine to feed a lint to the terminal */
  if (inputCommand === '') return;

  var command = this.commands[inputCommand];
  
  if (command)
    command(arg);
  else
    this.addHistory('sh: command not found: ' + inputCommand);
};

Terminal.prototype.fetchGitHubData = function() {
  fetch('https://api.github.com/users/rishabhc9/repos?sort=created')
    .then(response => response.json())
    .then(data => {
      // Sort repositories by creation date (latest first)
      const repos = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // Prepare output message
      let output = '';
      if (repos.length > 0) {
        output += 'Latest GitHub repositories:\n\n';
        repos.slice(0, 5).forEach(repo => {
          output += `${repo.name}\n`;
          output += `${repo.description || 'No description'}\n`;
          output += `View Project on GitHub: <a href="${repo.html_url}" target="_blank">${repo.html_url}</a>\n\n`;
        });
      } else {
        output += 'No GitHub repositories found.';
      }

      // Add to terminal history
      this.addHistory(output);
    })
    .catch(error => {
      console.error('Error fetching GitHub data:', error);
      this.addHistory('Error fetching GitHub repositories.');
    });
};

Terminal.prototype.fetchPublications = function() {
  fetch('https://pub.orcid.org/v3.0/0000-0003-4840-8673/works', {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the API response to examine its structure

      const publications = data.group;

      // Prepare output message
      let output = '';
      if (publications && publications.length > 0) {
        output += 'My publications:\n\n';
        publications.forEach(group => {
          const workSummaries = group['work-summary'];
          workSummaries.forEach(work => {
            const title = work.title.title?.value || 'Untitled';
            const journal = work['journal-title']?.value || 'Unknown Journal';
            const year = work['publication-date']?.year?.value || 'Unknown Year';
            output += `${title} (${journal}, ${year})\n\n`;
          });
        });
      } else {
        output += 'No publications found.';
      }

      // Add to terminal history
      this.addHistory(output);
    })
    .catch(error => {
      console.error('Error fetching publications:', error);
      this.addHistory('Error fetching publications.');
    });
};

// Initialize the terminal
new Terminal();
