//login to https://www.saucedemo.com/
const {test, expect} = require('@playwright/test');

test('task1', async({page})=>{
    const listItems=".inventory_list div .inventory_item_name";
    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill("standard_user");
    await page.locator('#password').fill("secret_sauce");
    await page.getByText(/login/i).click();

    const list=await page.locator(listItems)
    for(let l=0; l< await list.count(); l++){
        const text= await list.nth(l).textContent();
        console.log("textContent is->"+await text);
        console.log("count is ",await list.count())
        if(text == 'Sauce Labs Fleece Jacket'){
            list.nth(l).click();
            console.log("added to cart");
            break;
        }
    }
    await page.click('#add-to-cart');
    const cart =await page.locator('.shopping_cart_container');
    const cartCount =await page.locator('.shopping_cart_container span');
    expect(cartCount).toBeVisible();
    console.log("cartCount is" + cartCount)
    expect(parseInt(await cartCount.textContent())).toBe(1);
    console.log("no of items in cart is", await cartCount.textContent());

    await cart.click();
    const cartItems = await page.locator(".cart_list .inventory_item_name").all();
    let isPresent=false;
    for(let ci of cartItems){
        const ciName=await ci.textContent();
        console.log("item added in cart is",ciName);
        if(ciName=='Sauce Labs Fleece Jacket'){
            isPresent=true;
        }
    }
    expect(isPresent).toBeTruthy();
})