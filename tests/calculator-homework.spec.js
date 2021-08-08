const { test, expect } = require('@playwright/test');

test('Checks that TEstSheepNZ page can be opened', async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    const checkPageTitle = await page.textContent('.intro-heading.text-uppercase');
      expect(checkPageTitle).toContain('Basic Calculator');
  });


  const buildTipes = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];//, '9'];
  buildTipes.forEach(buildType => {
    test(`Open page and change build type to ${buildType}`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        const calculateFormIsVisable = await page.isVisible("#calcForm");
        expect(calculateFormIsVisable).toBe(true)
    });
  });

/* Add function doesn't work properly ir 2 and 7 build types */
  buildTipes.forEach(buildType => { 
    test(`Math function, ADD two numbers in the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '2');
        await page.fill('#number2Field', '5');
        await page.selectOption('select[name="selectOperation"]', '0'); // operation Add
        await page.click("#calculateButton");
        const addFunctionsResutls = await page.inputValue("#numberAnswerField");
        expect(addFunctionsResutls).toContain('7');
    });
  });

/* tried with first number negative and second positive, got the same results
Same with first number positive and second negative 
Error was in 2 and 7 built types*/
  buildTipes.forEach(buildType => {
    test(`Math function, ADD two negative numbers in the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '-2');
        await page.fill('#number2Field', '-5');
        await page.selectOption('select[name="selectOperation"]', '0'); // operation Add
        await page.click("#calculateButton");
        const addNegativeNumbersResult = await page.inputValue("#numberAnswerField");
        expect(addNegativeNumbersResult).toContain('-7');
    });
  });



/* Error in the 7 build type */
  buildTipes.forEach(buildType => {
    test(`Math function, SUBTRACT two numbers in the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '961');
        await page.fill('#number2Field', '121');
        await page.selectOption('select[name="selectOperation"]', '1'); // operation Subract
        await page.click("#calculateButton");
        const subtractTwoNumbersResult = await page.inputValue("#numberAnswerField");
        expect(subtractTwoNumbersResult).toContain('840');
    });
  });
/* Error in the 7 and 8 build type.
Looks like 8 build type has problems with negative numbers. It counts good, 
doesn't show a minus symbol */
  buildTipes.forEach(buildType => {
    test(`Math function, SUBTRACT two negative numbers in the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '-961');
        await page.fill('#number2Field', '-121');
        await page.selectOption('select[name="selectOperation"]', '1'); // operation Subract
        await page.click("#calculateButton");
        const subtractTwoNegativeNumbersResult = await page.inputValue("#numberAnswerField");
        expect(subtractTwoNegativeNumbersResult).toContain('-840');
    });
  });

/* Error in the 7 and 4 build type
Build type 7 gives us answer zero no metter what 
Build type 4 has checked integers only field  */
  buildTipes.forEach(buildType => { 
    test.only(`Math function, MULTIPLY in the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '11.4');
        await page.fill('#number2Field', '30.6');
        await page.selectOption('select[name="selectOperation"]', '2'); // operation multiply
        await page.click("#calculateButton");
        const multipleResutls = await page.inputValue("#numberAnswerField");
        expect(multipleResutls).toContain('348.84000000000003');
    });
  });

/* Error Build type 7 gives us 0 */
  buildTipes.forEach(buildType => { 
    test(`Math function, MULTIPLY by two negative numbersin the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '-11');
        await page.fill('#number2Field', '-30');
        await page.selectOption('select[name="selectOperation"]', '2'); // operation multiply
        await page.click("#calculateButton");
        const multipleNegativeNumbersResutls = await page.inputValue("#numberAnswerField");
        expect(multipleNegativeNumbersResutls).toContain('330');
    });
  });

/* works fine, no matter which fields value is zero */
  buildTipes.forEach(buildType => { 
    test(`Math function, MULTIPLY by zero in the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '3');
        await page.fill('#number2Field', '0');
        await page.selectOption('select[name="selectOperation"]', '2'); // operation multiply
        await page.click("#calculateButton");
        const multipleByZeroResutls = await page.inputValue("#numberAnswerField");
        expect(multipleByZeroResutls).toContain('0');
    });
  });

  /*  Error in 4, 7 and 8 build type
   */
  buildTipes.forEach(buildType => { //radau error
    test(`Math function, simple DEVIDE in the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '-10');
        await page.fill('#number2Field', '20');
        await page.selectOption('select[name="selectOperation"]', '3'); // operation devide
        await page.click("#calculateButton");
        const devideFunctionsResutls = await page.inputValue("#numberAnswerField");
        expect(devideFunctionsResutls).toContain('-0.5');
    });
  });


/* Errors in 6 and 8 build types
6 build type shows Infinity in the number answer field
 8 build type shows 0*/
  buildTipes.forEach(buildType => { //radau error
    test.only(`Math function, DEVIDE by zero in the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '10');
        await page.fill('#number2Field', '0');
        await page.selectOption('select[name="selectOperation"]', '3'); // operation devide
        await page.click("#calculateButton");
        const devideByZero = await page.textContent("#errorMsgField");
        expect(devideByZero).toContain('Divide by zero error!');
    });
  });


// Error 2, 7 and 8 build type
  buildTipes.forEach(buildType => { 
    test.only(`Math function Concatenate in the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '178');
        await page.fill('#number2Field', '35');
        await page.selectOption('select[name="selectOperation"]', '4'); // operation Concatenate
        await page.click("#calculateButton");
        const concatenateResult = await page.inputValue("#numberAnswerField");
        expect(concatenateResult).toContain('17835');
    });
  });







//Error in 2 and 7 build type
  buildTipes.forEach(buildType => { 
    test.only(`Math function ADD, with answer only integer in the ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '14.6');
        await page.fill('#number2Field', '5.1');
        await page.selectOption('select[name="selectOperation"]', '0'); // operation Add
        await page.click("#calculateButton");
        await page.check('#integerSelect');
        const addFunctionIntegerResutls = await page.inputValue("#numberAnswerField");
        expect(addFunctionIntegerResutls).toContain('19');
    });
  });


/*Error in 1, 2, 7, 8 build types  */
  buildTipes.forEach(buildType => { 
    test.only(`Math function ADD, number field 1 is symbol instead of numbers ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', 'hd');
        await page.fill('#number2Field', '5');
        await page.selectOption('select[name="selectOperation"]', '0'); // operation Add
        await page.click("#calculateButton");
        const addSymbol = await page.textContent("#errorMsgField");
        expect(addSymbol).toContain('Number 1 is not a number');
    });
  });


  buildTipes.forEach(buildType => { 
    test(`Math function ADD, number field 2 is symbol instead of numbers ${buildType} build type`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', buildType);
        await page.fill('#number1Field', '7');
        await page.fill('#number2Field', 'bs');
        await page.selectOption('select[name="selectOperation"]', '0'); // operation Add
        await page.click("#calculateButton");
        const addSymbol = await page.textContent("#errorMsgField");
        expect(addSymbol).toContain('Number 2 is not a number');
    });
  });
