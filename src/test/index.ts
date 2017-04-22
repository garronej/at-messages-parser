
require("colors");

let n = process.argv[2];

if (n) {

    require("./test" + n);

} else {

    for (let i = 1; i <= 36; i++) {

        try {
            require("./test" + i);
        } catch (error) {

            console.log(`Fail test ${i}`.red);

            throw error;


        }

    }
}