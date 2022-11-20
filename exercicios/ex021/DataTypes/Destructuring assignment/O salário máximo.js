function topSalary(salaries) {

    let maxSalary = 0;
    let maxName = null;

    for (const [name, salary] of Object.entries(salaries)) {
        if (maxSalary < salary) {
            maxSalary = salary;
            maxName = name;
        }
    }

    return maxName
}

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

topPerson = topSalary(salaries)

console.log(`The person ${topPerson} has most salary`);