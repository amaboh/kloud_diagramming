# 🌐 Cloud Diagrams Web Viewer

**Live visualization of cloud architecture diagrams at localhost:3000**

This interactive web viewer allows you to visualize and explore cloud architecture diagrams created with the `@cloud-diagrams` library directly in your browser.

## 🚀 Quick Start

### Option 1: Node.js Server (Recommended)

```bash
# Navigate to the web viewer directory
cd cloud-diagrams-ts/examples/web-viewer

# Start the server
node server.js

# Open your browser and go to:
# http://localhost:3000
```

### Option 2: Alternative Static Servers

If you prefer other static server options:

```bash
# Navigate to the web viewer directory
cd cloud-diagrams-ts/examples/web-viewer

# Python 3 (simple HTTP server)
python -m http.server 3000

# Python 2 (legacy)
python -m SimpleHTTPServer 3000

# Node.js alternatives
npx serve . -p 3000
npx http-server . -p 3000

# Open browser at http://localhost:3000
```

**Note**: The included `server.js` is the recommended option as it provides proper MIME types and error handling.

### Option 3: Live Server (VS Code Extension)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. It will automatically open at `http://127.0.0.1:5500`

## ✨ Features

### 🏗️ **Interactive Diagram Viewer**

- Real-time rendering with Mermaid.js
- Multiple pre-built architecture examples
- Clickable nodes with interactive feedback
- Professional styling with animations

### 🎨 **Theme Support**

- **Default**: Professional light theme
- **Dark**: Dark mode for better visibility
- **Forest**: Green nature-inspired theme
- **Base**: Minimal clean theme

### 📊 **Architecture Examples**

#### 1. **Basic AWS Architecture**

- VPC with Load Balancer, Web Server, Database
- S3 for static assets
- Professional AWS styling and colors

#### 2. **3-Tier Web Application**

- Web Tier: Load Balancer + Web Servers
- Application Tier: App Servers
- Data Tier: Primary Database + Read Replica
- Multi-tier organization with groups

#### 3. **Microservices with Azure**

- API Gateway pattern
- Azure Functions and Container Instances
- Cosmos DB, Azure SQL, Redis Cache
- Service-oriented architecture

#### 4. **Multi-Cloud Data Pipeline**

- AWS: S3 Data Lake + Lambda ETL
- Azure: Blob Storage + Azure Function
- GCP: Cloud Storage + BigQuery
- Cross-cloud data flow visualization

#### 5. **Custom Architecture**

- Template for your own diagrams
- Customizable nodes and connections

### 🛠️ **Export & Sharing**

- **SVG Export**: Download diagrams as vector graphics
- **Copy Source**: Get Mermaid source code for reuse
- **Professional Quality**: Ready for presentations and documentation

### 📱 **Responsive Design**

- Mobile-friendly responsive layout
- Touch-friendly controls on tablets/phones
- Adaptive grid system for different screen sizes

## 🎯 Usage Examples

### For Learning

- Explore different cloud architecture patterns
- Understand multi-cloud integrations
- See how different providers compare

### For Development

- Prototype your cloud architectures
- Test diagram layouts and themes
- Generate diagrams for documentation

### For Presentations

- Export high-quality SVG diagrams
- Professional styling ready for business presentations
- Interactive demonstrations

## 🔧 Advanced Usage

### Using Your Own Diagrams

You can modify the `index.html` file to add your own diagrams:

```javascript
// Add to the diagrams object in index.html
const diagrams = {
  // ... existing diagrams

  myArchitecture: {
    title: 'My Custom Architecture',
    provider: 'AWS',
    nodes: 5,
    connections: 4,
    code: `flowchart TD
      A["My Node 1"]
      B["My Node 2"]
      C["My Node 3"]
      
      A --> B
      B --> C
      
      style A fill:#667eea
      style B fill:#764ba2
      style C fill:#48bb78`,
  },
};
```

### Integration with @cloud-diagrams Library

To generate diagrams programmatically and view them:

```typescript
// In your TypeScript application
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';

const diagram = new Diagram('My Architecture');
const web = new EC2('web');
const db = new RDS('db');

diagram.addNode(web);
diagram.addNode(db);
diagram.connect(web, db);

// Get the Mermaid code
const mermaidCode = diagram.render();

// Copy this code to the web viewer or save to file
console.log(mermaidCode);
```

### Customizing Themes

You can modify the Mermaid theme configuration in the HTML file:

```javascript
mermaid.initialize({
  theme: 'default', // or 'dark', 'forest', 'base'
  themeVariables: {
    primaryColor: '#667eea',
    primaryTextColor: '#333',
    primaryBorderColor: '#5a67d8',
    lineColor: '#6b46c1',
  },
});
```

## 🎨 Styling Guide

### Cloud Provider Colors

The viewer uses official cloud provider color schemes:

- **AWS**: Orange (#ff9900), Blue (#232f3e)
- **Azure**: Blue (#0078d4), Light Blue (#40e0d0)
- **GCP**: Blue (#4285f4), Red (#ea4335), Yellow (#fbbc04), Green (#34a853)

### Node Types

Different node types have distinct styling:

- **Compute**: Orange/Red backgrounds
- **Database**: Blue backgrounds
- **Storage**: Green backgrounds
- **Network**: Purple/Blue backgrounds

## 🚀 Production Use

### For Teams

- Host on internal servers for team collaboration
- Customize with company branding and colors
- Integrate with CI/CD for automatic diagram generation

### For Documentation

- Generate diagrams for architecture documentation
- Export SVGs for wikis and knowledge bases
- Create interactive architecture guides

### For Education

- Teaching cloud architecture concepts
- Comparing different provider approaches
- Hands-on learning with interactive examples

## 🛠️ Troubleshooting

### Common Issues

**Diagrams not rendering:**

- Check browser console for JavaScript errors
- Ensure internet connection (for Mermaid.js CDN)
- Try refreshing the page

**Export not working:**

- Modern browsers required for SVG export
- Check browser's download settings
- Try right-click "Save As" on the diagram

**Mobile display issues:**

- Use landscape orientation for better viewing
- Zoom out if diagrams are too large
- Some interactions may require desktop browser

### Performance Tips

- For large diagrams (50+ nodes), use manual layout mode
- Close unused browser tabs to free memory
- Use Chrome or Firefox for best performance

## 📚 Next Steps

1. **Try the Examples**: Explore all the pre-built architectures
2. **Customize Themes**: Experiment with different visual styles
3. **Create Your Own**: Add custom diagrams to the viewer
4. **Integrate**: Use with the full @cloud-diagrams library
5. **Share**: Export and use diagrams in presentations

## 🤝 Contributing

Want to add more examples or improve the viewer?

1. Fork the repository
2. Add new diagram examples to the `diagrams` object
3. Improve the CSS styling or add new themes
4. Submit a pull request

## 📞 Support

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check the main [TUTORIAL.md](../../TUTORIAL.md)
- **Examples**: Explore more in the [examples directory](../)

---

**Enjoy exploring cloud architectures! 🚀**
