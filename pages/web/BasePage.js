export default class BasePage {
	async wait(time) {
		await page.waitFor(time)
	}

	async getTitle() {
		return await page.title()
	}

	async getUrl() {
		return await page.url()
	}

	async waitAndClick(selector) {
	await this.page.waitForSelector(selector)
	await this.page.click(selector)
	}

	async waitAndType(selector, text) {
	await this.page.waitForSelector(selector)
	await this.page.type(selector, text)
	}

	async getText(selector) {
	await this.page.waitForSelector(selector)
	return this.page.$eval(selector, e => e.innerHTML)
	}

	async getCount(selector) {
	await this.page.waitForSelector(selector)
	return this.page.$$eval(selector, items => items.length)
	}

	async waitForText(selector, text) {
	await this.page.waitForSelector(selector)
	try {
		await this.page.waitForFunction(
		(selector, text) =>
			document
			.querySelector(selector)

			.innerText.replace(/\s/g, '')
			.toLowerCase()
			.includes(text.replace(/\s/g, '').toLowerCase()),
		{},
		selector,
		text
		)
	} catch (error) {
		if (error instanceof puppeteer.errors.TimeoutError) {
		throw new Error(`Text "${text}" not found for selector "${selector}"`)
		}
		throw new Error(error)
	}
	}

	async waitForXPathAndClick(xpath) {
	await this.page.waitForXPath(xpath)
	const elements = await this.page.$x(xpath)
	if (elements.length > 1) {
		console.warn('waitForXPathAndClick returned more than one result')
	}
	await elements[0].click()
	}

	async isElementVisible(selector) {
	let visible = true
	await this.page
		.waitForSelector(selector, { visible: true, timeout: 3000 })
		.catch(() => {
		visible = false
		})
	return visible
	}

	async isXPathVisible(selector) {
	let visible = true
	await this.page
		.waitForXPath(selector, { visible: true, timeout: 3000 })
		.catch(() => {
		visible = false
		})
	return visible
	}

	async autoScrollToBottomOfPage() {
	await this.page.evaluate(async () => {
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
}
