*** Settings ***
Library  SeleniumLibrary
# from selenium.webdriver import Firefox

*** Variables ***
${BROWSER} =  Chrome
${BASE_URL} =  https://wepapp.netlify.app/#/
${USER_EMAIL} =  user1@gmail.com
${USER_PASSWORD} =  123123

${NEW_USER_EMAIL} =  robot2@gmail.com
${NEW_USER_NAME} =  robot framework
${NEW_USER_PASSWORD} =  123123123
${NEW_USER_PHONE} =  1234567890

*** Keywords ***
