const input = document.querySelector('input');
document.addEventListener('keydown', function(e) {
  if (e.keyCode === 13 && input.value) {
    var node = document.createElement("DIV");
    node.style.color = "#888";
    node.style.fontSize = "12px";
    node.style.paddingLeft = '5px';

    const typeWriter = (text, element) => {
      let i = 0;
      const typing = () => {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(typing, 20);
        }
      };
      typing();
    };

  
    if (input.value === 'help') {
      const para = document.createElement("p");
      para.style.display = 'block';
      const text = 'rishabhchopda@rc9 ~ % Supported commands: about, clear, publications, projects, skills, contact';
      typeWriter(text, para);
      // Set the command label
      document.querySelector(".commands").appendChild(para);

    } else if (input.value === 'about') {
      const para = document.createElement("p");
      const lineBreak9 = document.createElement("br");
      para.appendChild(lineBreak9);
      para.style.display = 'block';
      const text0 = "rishabhchopda@rc9 ~ % About Me: ";
      const text1 = "Extremely motivated to constantly develop my skills and grow professionally.";
      const text2 = "I am a Computer Engineer confident in my ability to come up with interesting ideas and am eager to secure some challenging roles in the IT sector.";
      const text = `${text0}\n\n${text1}${text2}`;
      
      document.querySelector(".commands").appendChild(para);
    
      const typeWriter = (text, element) => {
        let i = 0;
        const typing = () => {
          if (i < text.length) {
            if (text.charAt(i) === '\n') {
              element.appendChild(document.createElement("br"));
            } else {
              element.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(typing, 20);
          }
        };
        typing();
      };
    
      typeWriter(text, para);
    }else if (input.value === 'contact') {
      const para = document.createElement("p");
      const lineBreak9 = document.createElement("br");
      para.appendChild(lineBreak9);
      para.style.display = 'block';
    
      const link1 = document.createElement("a");
      link1.href = '#';
      link1.style.color = '#888';
      link1.style.textDecoration = 'none';
      const text1 = "rishabhchopda@rc9 ~ % Let's Connect Over:";
      typeWriter(text1, link1);
      para.appendChild(link1);
      
      const lineBreak0 = document.createElement("br");
      para.appendChild(lineBreak0);
      const lineBreak1 = document.createElement("br");
      para.appendChild(lineBreak1);
    
      const link2 = document.createElement("a");
      link2.href = 'https://wa.link/qoc7x2';
      link2.style.color = '#fff';
      const text2 = 'Whatsapp';
      typeWriter(text2, link2);
      para.appendChild(link2);
    
      const lineBreak2 = document.createElement("br");
      para.appendChild(lineBreak2);
    
      const link3 = document.createElement("a");
      link3.href = 'mailto:rishabhchopda79@gmail.com';
      link3.style.color = '#fff';
      const text3 = 'Email';
      typeWriter(text3, link3);
      para.appendChild(link3);
    
      const lineBreak3 = document.createElement("br");
      para.appendChild(lineBreak3);
    
      const link4 = document.createElement("a");
      link4.href = 'https://www.linkedin.com/in/rishabh-chopda-16b378151/';
      link4.style.color = '#fff';
      const text4 = 'Linkedin';
      typeWriter(text4, link4);
      para.appendChild(link4);

    
      document.querySelector(".commands").appendChild(para);
    } else if (input.value === 'skills') {

      const para = document.createElement("p");
      const lineBreak9 = document.createElement("br");
      para.appendChild(lineBreak9);
      
      para.style.display = 'block';
      para.style.width = '100%';
      para.style.wordWrap = 'break-word';
    
      const skills = ['rishabhchopda@rc9 ~ % I Work Well With :',"- Python (NumPy, Pandas, Scikit-learn, Matplotlib)", "- HTML", "- CSS", "- JS", "- PHP", "- SQL", "- C Language"];
    
      for (let i = 0; i < skills.length; i++) {
        const text = skills[i];

        const skillPara = document.createElement("p");
        skillPara.style.margin = '0';
        typeWriter(text, skillPara);
        para.appendChild(skillPara);
       
      }
      document.querySelector(".commands").appendChild(para);
    } else if (input.value === 'projects') {
      // Fetch the repositories from GitHub API
      fetch('https://api.github.com/users/rishabhc9/repos?sort=created')
        .then(response => response.json())
        .then(data => {
          // Sort repositories by creation date (latest first)
          const repos = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

          // Display repositories on the webpage
          const para = document.createElement("p");
          const lineBreak9 = document.createElement("br");
          para.appendChild(lineBreak9);
          para.style.display = 'block';

          if (repos.length > 0) {
            const text = ' rishabhchopda@rc9 ~ % Latest GitHub repositories: ↑';
            typeWriter(text, para);
            repos.slice(0, 5).forEach(repo => {
              const repoName = document.createElement("span");
              repoName.style.fontWeight = 'bold';
              repoName.innerText = repo.name;

              const repoDescription = document.createElement("span");
              repoDescription.style.color = '#888';
              repoDescription.innerText = repo.description || 'No description';

              const repoLink = document.createElement("a");
              repoLink.href = repo.html_url;
              repoLink.target = '_blank';
              repoLink.style.textDecoration = 'none';
              repoLink.style.color = '#0366d6';
              repoLink.innerText = 'View on GitHub';

              const repoEntry = document.createElement("p");
              repoEntry.appendChild(repoName);
              repoEntry.appendChild(document.createElement("br"));
              repoEntry.appendChild(repoDescription);
              repoEntry.appendChild(document.createElement("br"));
              repoEntry.appendChild(repoLink);
              repoEntry.style.marginBottom = '10px';

              para.appendChild(repoEntry);
            });
          } else {
            const text = ' rishabhchopda@rc9 ~ % No GitHub repositories found.';
            typeWriter(text, para);
          }

          document.querySelector(".commands").appendChild(para);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
      else if (input.value === 'clear') {
      const commandsContainer = document.querySelector(".commands");
      while (commandsContainer.firstChild) {
        commandsContainer.removeChild(commandsContainer.firstChild);
    }
    } else if (input.value === 'cls') {
      const commandsContainer = document.querySelector(".commands");
      while (commandsContainer.firstChild) {
        commandsContainer.removeChild(commandsContainer.firstChild);
      }
    }
    else if (input.value === 'publications') {
      // Fetch publications from ORCID API
      fetch('https://pub.orcid.org/v3.0/0000-0003-4840-8673/works', {
        headers: {
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Log the API response to examine its structure
    
          const publications = data.group;
    
          // Display publications on the webpage
          const para = document.createElement("p");
          const lineBreak9 = document.createElement("br");
          para.appendChild(lineBreak9);
          para.style.display = 'block';
    
          if (publications && publications.length > 0) {
            const text = ' rishabhchopda@rc9 ~ % My publications: ↑';
            typeWriter(text, para);
    
            publications.forEach(group => {
              const workSummaries = group['work-summary'];
    
              workSummaries.forEach(work => {
                const title = work.title.title?.value || 'Untitled';
                const journal = work['journal-title']?.value || 'Unknown Journal';
                const year = work['publication-date']?.year?.value || 'Unknown Year';
    
                const publicationEntry = document.createElement("p");
                publicationEntry.innerHTML = `<strong>${title}</strong><br>${journal}, ${year}`;
                publicationEntry.style.marginBottom = '10px';
    
                para.appendChild(publicationEntry);
              });
            });
          } else {
            const text = ' rishabhchopda@rc9 ~ % No publications found.';
            typeWriter(text, para);
          }
    
          document.querySelector(".commands").appendChild(para);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
     else {
      const para = document.createElement("p");
      para.style.display = 'block';
      const text = 'rishabhchopda@rc9 ~ % command not found: ' + input.value;
      typeWriter(text, para);
      document.querySelector(".commands").appendChild(para);
    }

    input.value = "";
  }
});

function f() {
  document.querySelector('input').focus();
}

