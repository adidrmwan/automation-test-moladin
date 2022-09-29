import TransactionPage from '../../../pages/web/TransactionPage'

import { cardNumber, cardExpiry, cardCvv, otp,timeout } from '../../../data/config'

describe('User Success Create Transaction using Credit Card', () => {
	let transactionPage

	beforeAll(async () => {
		jest.setTimeout(timeout)
		transactionPage = new TransactionPage();
	})

	it('User on Product Page', async () => {
		await transactionPage.visit()
		await transactionPage.isProductDisplayed()
	})

	it('User Click Buy Product Button', async () => {
		await transactionPage.clickBuyButton()
		await transactionPage.isDetailShoppingCartDisplayed()
	})

	it('User Click Checkout Product Button', async () => {
		await transactionPage.clickCheckoutButton()
		await transactionPage.isDetailPaymentDisplayed()
	})

	it('User Fill Detail Payment Using Credit Card', async () => {
		await transactionPage.selectCreditCardPayment()
		await transactionPage.isCreditCardFieldDisplay()
		await transactionPage.inputCreditCardDetail(cardNumber, cardExpiry, cardCvv)
	})

	it('User Click Pay Using Credit Card Button', async () => {
		await transactionPage.clickPayButton()
		await transactionPage.isOtpModalDisplayed()
	})

	it('User Fill OTP', async () => {
		await transactionPage.inputOtp(otp)
	})

	it('User See Success Create New Transaction Message', async () => {
		await transactionPage.isSuccessTransactionMessageDisplayed()
	})
})
