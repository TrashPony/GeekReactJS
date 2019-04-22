// **** TASK_1 ****//
function loop(times = 0, callback = null) {
    for (let i = 0; i < times; i++) {
        if (callback) callback(i);
    }
}

loop(10, function (i) {
    console.log(i)
});

// **** TASK_2 ****//
function calculateArea(options) {
    if (options.figure && options.figure === 'rectangle')
        return {area: options.width * options.height, figure: options.figure, input: options};
}

let {area, figure, input} = calculateArea({width: 10, height: 5, figure: 'rectangle'});
console.log('area: ', area, ', figure: ', figure, ', options: ', input);

// **** TASK_3 ****//
class Human {
    constructor(name = 'Bob', age = 25, dateOfBirth = '03.06.1993') {
        this.name = name;
        this.age = age;
        this.dateOfBirth = dateOfBirth;
    }

    displayInfo() {
        return 'name: ' + this.name + ' age: ' + this.age + ' dateOfBirth: ' + this.dateOfBirth;
    }
}

class Employee extends Human {
    constructor(name, age, dateOfBirth, salary, department) {
        super(name, age, dateOfBirth);
        this.salary = salary;
        this.department = department;
    }

    displayInfo() {
        let data = super.displayInfo();
        return data += ' salary: ' + this.salary + ' department: ' + this.department;
    }
}

class Developer extends Employee {
    constructor(name, age, dateOfBirth, manager = null) {
        super(name, age, dateOfBirth, 500, 'dev');
        this.manager = manager;
    }

    setManager(manager) {
        if (manager instanceof Manager || manager === null) {
            this.manager = manager;
        }
    }
}

class Manager extends Employee {
    constructor(name, age, dateOfBirth, developers = []) {
        super(name, age, dateOfBirth, 1000, 'management');
        this.developers = developers;
    }

    addDeveloper(developer) {
        if (developer instanceof Developer) {
            developer.setManager(this);
            this.developers.push(developer);
        }
    }

    removeDeveloper(developer) {
        for (let i = 0; i < this.developers.length; i++) {
            if (this.developers[i].name === developer.name && this.developers[i].dateOfBirth === developer.dateOfBirth) {
                developer.setManager(null);
                delete this.developers[i];
                return;
            }
        }
    }
}

let manager = new Manager("Ololosha", 25, '03.07.1990');
let dev1 = new Developer("dev1", 26, '23.07.1990');
let dev2 = new Developer("dev2", 36, '23.07.1930');

manager.addDeveloper(dev1);
manager.addDeveloper(dev2);
manager.removeDeveloper(dev1);

console.log(manager);
console.log(dev1);

// **** TASK_4 ****//
function PromisesCreater() {
    let promises = [];

    for (let i = 1; i <= 10; i++) {
        promises.push(makeXHR('https://jsonplaceholder.typicode.com/users/' + i, 'GET', null))
    }

    return promises
}

function makeXHR(url, method, data) {
    return new Promise((resolve, reject) => {
        const xhr = window.XMLHttpRequest
            ? new window.XMLHttpRequest() : new window.ActiveXObject();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                }
                reject(new Error())
            }
        };

        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(data)
    })
}

Promise.all(PromisesCreater()).then(result => {
    console.log(result);
});