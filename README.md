# ToDoList Application

## 📋 Prerequisites
Ensure you have the following installed on your development machine:

### Required
- **[.NET 9+ SDK](https://dotnet.microsoft.com/download/dotnet/9.0)** (Latest version)
- **[Node.js](https://nodejs.org/)** (v18.x or later)
- **[Angular CLI](https://angular.io/cli)**: `npm install -g @angular/cli`

### 1.  Clone the Repository
Open "Windows PowerShell" or "Git Bash" and execute following commands on the shell.
```bash
git clone https://github.com/buddhirameshi/ToDoList.git
cd ToDoList
```
### 2. Frontend Setup (Angular)

```bash
# Navigate to the Angular app directory
cd ToDoListAPI/wwwroot

# Install Node.js dependencies
npm install

```

### 3. Backend Setup (.NET API)
```bash
# Navigate to the main project directory
cd ToDoListAPI

# Restore NuGet packages
dotnet restore

# Build the solution
dotnet build

# Run the API (starts on HTTPS)
dotnet run
```

**Backend will be available at:** `https://localhost:5220` 

### 4. Access the Application

- **Web Application:** http://localhost:5220
- **API Documentation (Swagger):** https://localhost:5220/swagger
- **API Base URL:** https://localhost:5220/api


## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 🙏 Support

If you encounter any issues or have questions:

1. **Check** the [Issues](https://github.com/buddhirameshi/ToDoList/issues) page
2. **Review** this README and troubleshooting section
3. **Create** a new issue with detailed information

---

*Built with ❤️ using .NET 9 and Angular 20
