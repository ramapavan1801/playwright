const {test} = require('@playwright/test'); //importing test annotation

test('First test case',async function(){ //we can rewrite function() as ()=>
    //test case steps
    //step1
    //await (needs to mention async in function)
    //step2 will execute only if step1 is completed as await was written
})

test('second test', async ({browser})=> //browser is a fixture
{
    const context = browser.newContext(); //we can add as page fixture similar to browser {browser, page}
    const page = await context.newPage();// no need of mentioning these two steps if there is no specific context to set
    await page.goto("https://youtube.com")
})

test('second test alternative', async({browser, page})=>
{
    await page.goto("https://youtube.com")
})