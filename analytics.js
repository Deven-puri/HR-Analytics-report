const fs = require('fs');
const path = require('path');
function loadEmployeesData() {
    try {
        const jsonFilePath = path.join(__dirname, 'employees.json');
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error loading employees data:', error);
        return null;
    }
}
function sortEmployeesBySalary() {
    const employees = loadEmployeesData();
    if(!employees) return [];
    return employees.sort((a,b) => b.salary - a.salary);
}
function filterEmployeesByExperience() {
    const employees = loadEmployeesData();
    if(!employees) return [];
    return employees.filter(emp => emp.experience >= 3);
}
function createSummaryList(employees) {
    return employees.map(emp => ({
        name: emp.name,
        department: emp.department,
        annualBonus: emp.salary * 0.10 * emp.experience
    }));
}
function calculateTotalSalaryExpenditure() {
    const experiencedEmployees = filterEmployeesByExperience();
    if(!experiencedEmployees) return 0;
    return experiencedEmployees.reduce((total, emp) => total + emp.salary, 0);
}
function displaySortedEmployees() {
    console.log('Employees Sorted by Salary (Descending)');
    console.log('=' .repeat(60));
    const sortedEmployees = sortEmployeesBySalary();
    sortedEmployees.forEach((emp, index) => {
        console.log(`id: ${emp.id}`)
        console.log(`${index + 1}. ${emp.name}`);
        console.log(` Salary: $${emp.salary.toLocaleString()}`);
        console.log(`Department: ${emp.department}`);
        console.log(`Experience: ${emp.experience} years`);
        console.log(`Projects: ${emp.projects.map(p => p.name).join(', ')}`);
        console.log(`Skills: ${emp.skills.join(', ')}`);
        console.log(`Location: ${emp.location.city}, ${emp.location.country}`);
        console.log('-'.repeat(40));
    });
}
function displaySummaryWithBonuses() {
    const experiencedEmployees = filterEmployeesByExperience();
    const summaryList = createSummaryList(experiencedEmployees);
    console.log('Summary');
    summaryList.forEach((emp, index) => {
        console.log(`${index + 1}. ${emp.name}`);
        console.log(` Department: ${emp.department}`);
        console.log(` Annual Bonus: $${emp.annualBonus.toLocaleString()}`);
        console.log('-'.repeat(40));
        
    })
    console.log(`Total Experienced Employees: ${summaryList.length}`);
}
function displayTotalExpenditure() {
    console.log('Total expenditure:');
    console.log('='.repeat(40));
    const totalExpenditure = calculateTotalSalaryExpenditure();
    console.log(`Total ssalary expenditure : $${totalExpenditure.toLocaleString()}`);
    console.log();
}
function runHRAnalytics() {  
    displaySortedEmployees();
    displaySummaryWithBonuses();
    displayTotalExpenditure();
}
runHRAnalytics();

