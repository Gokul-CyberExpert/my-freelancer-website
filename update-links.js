const fs = require('fs');

const files = ['about.html', 'projects.html', 'services.html', 'contact.html'];
files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/data-path="home"\s+href="#"/g, 'data-path="home" href="/"');
    content = content.replace(/data-path="about"\s+href="#"/g, 'data-path="about" href="/about"');
    content = content.replace(/data-path="services"\s+href="#"/g, 'data-path="services" href="/services"');
    content = content.replace(/data-path="projects"\s+href="#"/g, 'data-path="projects" href="/projects"');
    content = content.replace(/data-path="contact"\s+href="#"/g, 'data-path="contact" href="/contact"');
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
