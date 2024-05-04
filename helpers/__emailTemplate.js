export const emailTemplate = link => {
	return `
    <h1>Підтвердження адреси електронної пошти</h1>
    <p>Натисніть на кнопку нижче, щоб підтвердити свою адресу електронної пошти.</p>
    <a href="${link}">Підтвердити адресу електронної пошти</a>
    <p>Якщо кнопка не працює, скопіюйте та вставте наступне посилання у ваш браузер:</p>
    <a href="${link}">${link}</a>
  `
}
