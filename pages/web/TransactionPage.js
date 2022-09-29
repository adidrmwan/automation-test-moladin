import BasePage from './BasePage'
import { box_product, title_product, buy_btn, desc_product, transaction_success_title, transaction_failed_title } from './elements/Transaction'
import { shopping_cart, checkout_cart_btn } from './elements/ShoppingCartModal'
import { store_title, total_price, payment_list_title, credit_card_payment, credit_card_title, card_number, card_expiry, card_cvv, pay_btn } from './elements/PaymentModal'
import { otp_title, otp_desc, otp_field, ok_btn, failed_payment_message, ok_failed_btn } from './elements/OtpModal'
import { payment_success_title } from './elements/PaymentSuccessModal'

export default class TransactionPage{

	async visit() {
		await page.goto('https://demo.midtrans.com/')
	}

	async isProductDisplayed() {
		await page.waitForSelector(box_product)
        await page.waitForSelector(title_product)
        await page.waitForSelector(desc_product)
        await page.waitForSelector(buy_btn)
	}

	async clickBuyButton() {
		await page.click(buy_btn)
	}

    async isDetailShoppingCartDisplayed() {
        await page.waitForXPath(shopping_cart, { timeout: 10000 })
        await page.waitForXPath(checkout_cart_btn, { timeout: 10000 })
    }

    async clickCheckoutButton() {
        await page.waitForXPath(checkout_cart_btn, { timeout: 10000 })
        const elem = await page.$x(checkout_cart_btn)
        if (elem.length > 1) {
            console.warn('waitForXPathAndClick returned more than one result')
        }
        await elem[0].click()
    }

    async isDetailPaymentDisplayed() {
        const elementHandle = await page.waitForSelector('#snap-midtrans')
        const frame = await elementHandle.contentFrame()
        await frame.waitForSelector(store_title)
        await frame.waitForSelector(total_price)
        await frame.waitForSelector(payment_list_title)
    }

    async selectCreditCardPayment() {
        const elementHandle = await page.waitForSelector('#snap-midtrans')
        const frame = await elementHandle.contentFrame()
        await frame.waitForXPath(credit_card_payment, { timeout: 10000 })
        const elem = await frame.$x(credit_card_payment)
        if (elem.length > 1) {
            console.warn('waitForXPathAndClick returned more than one result')
        }
        await elem[0].click()
    }

    async isCreditCardFieldDisplay() {
        const elementHandle = await page.waitForSelector('#snap-midtrans')
        const frame = await elementHandle.contentFrame()
        await frame.waitForXPath(credit_card_title)
        await frame.waitForSelector(card_number)
        await frame.waitForSelector(card_expiry)
        await frame.waitForSelector(card_cvv)
    }

    async inputCreditCardDetail(cardNumber, cardExpiry, cardCvv) {
        await waitForSelectorAndTypeOnFrame('#snap-midtrans', card_number, cardNumber)
        await waitForSelectorAndTypeOnFrame('#snap-midtrans', card_expiry, cardExpiry)
        await waitForSelectorAndTypeOnFrame('#snap-midtrans', card_cvv, cardCvv)
    }

    async clickPayButton() {
        const elementHandle = await page.waitForSelector('#snap-midtrans')
        const frame = await elementHandle.contentFrame()
        await autoScrollToBottomOfPage()
        const elem = await frame.$x(pay_btn)
        if (elem.length > 1) {
            console.warn('waitForXPathAndClick returned more than one result')
        }
        await elem[0].click()
    }

    async isOtpModalDisplayed() {
        const elementHandle = await page.waitForSelector('#snap-midtrans')
        const frame = await elementHandle.contentFrame()
        const elem = await frame.waitForSelector('iframe[title= "3ds-iframe"]')
        const frame2 = await elem.contentFrame()
        await frame2.waitForXPath(otp_title)
        await frame2.waitForSelector(otp_desc)
        await frame2.waitForSelector(otp_field)
        await frame2.waitForSelector(ok_btn)
    }

    async inputOtp(otp) {
        const elementHandle = await page.waitForSelector('#snap-midtrans')
        const frame = await elementHandle.contentFrame()
        const elem = await frame.waitForSelector('iframe[title= "3ds-iframe"]')
        const frame2 = await elem.contentFrame()
        await frame2.type(otp_field, otp)
        await frame2.click(ok_btn)
    }

    async isSuccessTransactionMessageDisplayed() {
        const elementHandle = await page.waitForSelector('#snap-midtrans')
        const frame = await elementHandle.contentFrame()
        await frame.waitForXPath(payment_success_title)
        await page.waitForXPath(transaction_success_title, { timeout: 10000 } )
    }

    async isFailedPaymentMessageDisplayed() {
        const elementHandle = await page.waitForSelector('#snap-midtrans')
        const frame = await elementHandle.contentFrame()
        await frame.waitForXPath(failed_payment_message)
        const elem = await frame.$x(ok_failed_btn)
        if (elem.length > 1) {
            console.warn('waitForXPathAndClick returned more than one result')
        }
        await elem[0].click()
        await page.waitForXPath(transaction_failed_title, { timeout: 10000 } )
    }

}

async function waitForSelectorAndTypeOnFrame(selector, selector2, input) {
    const elementHandle =  await page.waitForSelector(selector)
    const frame =  await elementHandle.contentFrame()
    await frame.waitForSelector(selector2)
    await frame.type(selector2, input, {delay: 100} )
}

async function autoScrollToBottomOfPage() {
	await page.evaluate(async () => {
		await new Promise(resolve => {
		let totalHeight = 0
		const distance = 100
		const timer = setInterval(() => {
			const scrollHeight = document.body.scrollHeight
			window.scrollBy(0, distance)
			totalHeight += distance
			if (totalHeight >= scrollHeight) {
			clearInterval(timer)
			resolve()
			}
		}, 200)
		})
	})
}
