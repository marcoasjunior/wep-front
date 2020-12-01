*** Settings ***
Documentation  Login at Test Account
Library  SeleniumLibrary

Resource  ../common/variables.robot
Resource  ../common/starters.robot

*** Test Cases ***
Start Open Browser
    open test environment

try login account
    try login user

try login with wrong email
    Reset Test
    try login wrong credentials

*** Keywords ***
open test environment
    starters.Initial test open Browser

try login user
    Wait Until Element Is visible   xpath=//*[@id="app_p"]/div/div/div/a[1]
    Click Element   xpath=//*[@id="app_p"]/div/div/div/a[1]

    Element Should be Visible   xpath=//*[@id="input-17"]
    Click Element   xpath=//*[@id="input-17"]
    Input Text  xpath=//*[@id="input-17"]   ${USER_EMAIL}
    
    Element Should be Visible   xpath=//*[@id="input-21"]
    Click Element   xpath=//*[@id="input-21"]
    Input Text  xpath=//*[@id="input-21"]   ${USER_PASSWORD}

    Wait Until Element Is Enabled   xpath=//*[@id="app_p"]/div/div/button
    Click Element   xpath=//*[@id="app_p"]/div/div/button
    Run Keyword     login okay?

Reset Test
    Go to   ${BASE_URL}


try login wrong credentials
    Wait Until Element Is visible   xpath=//*[@id="app_p"]/div/div/div/a[1]
    Click Element   xpath=//*[@id="app_p"]/div/div/div/a[1]

    Wait Until Element Is visible   xpath=//*[@id="input-17"]
    Click Element   xpath=//*[@id="input-17"]
    Input Text  xpath=//*[@id="input-17"]   123456789
    
    Wait Until Element Is visible   xpath=//*[@id="input-21"]
    Click Element   xpath=//*[@id="input-21"]
    Input Text  xpath=//*[@id="input-21"]   123456789

    Wait Until Element Is Enabled   xpath=//*[@id="app_p"]/div/div/button
    Click Element   xpath=//*[@id="app_p"]/div/div/button
    Run Keyword     login okay?

login okay?
    Wait Until Element Is visible   xpath=//*[@id="app_p"]/div/div

