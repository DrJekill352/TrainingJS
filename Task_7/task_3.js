function Machine(power) {
    this.power = power;
    this.enabled = false;
}

Machine.prototype.enable = function () {
    this.enabled = true;
}

Machine.prototype.disable = function () {
    this.enabled = false;
}

function Fridge(power) {
    Machine.call(this, power);
    var food = [];

    this.addFood = function () {
        if (this.enabled) {
            var arrayNewFood = convertArrayLikeToArray(arguments);

            if (isHaveFreeSpace(this.power, food, arrayNewFood)) {
                for (var i = 0; i < arrayNewFood.length; i++) {
                    food.push(arrayNewFood[i]);
                }
                console.log("Ok");
            } else {
                console.log("Error, too many food");
            }
        } else {
            console.log("Fridge off");
        }
    }

    this.getFood = function () {
        return food.slice();
    }

    var isHaveFreeSpace = function (power, food, newFood) {
        var countFreeSpace = power / 100 - food.length;
        var countNewFood = newFood.length;

        if (countNewFood <= countFreeSpace) {
            return true;
        } else {
            return false;
        }
    }
}

Fridge.prototype = Object.create(Machine.prototype);
Fridge.prototype.constructor = Fridge;

function convertArrayLikeToArray(arrayLike) {
    var arrayLike = arrayLike;
    var array = [];

    for (var i = 0; i < arrayLike.length; i++) {
        array[i] = arrayLike[i];
    }

    return array;
}

var fridge = new Fridge(500);

fridge.enable();

fridge.addFood("торт", "Картошка", "Варение");
fridge.addFood("Пирог", "Сок");

var getFood = fridge.getFood();
console.log(getFood);
getFood.push("вилка", "ложка");
console.log(getFood);
console.log(fridge.getFood());