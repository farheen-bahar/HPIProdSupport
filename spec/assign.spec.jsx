const fs = require('fs');
const { element, browser } = require('protractor');
const { login, dashboard, incidents, updateFields } = require('../properties.jsx');
let incr = 0;

const fillWithoutEvent = async (fieldData, nullCheck = false) => {
  await browser.executeScript((fieldData, nullCheck) => {
    if (nullCheck ? !document.getElementById(fieldData.elemId).value : true) {
      document.getElementById(fieldData.elemId).value = fieldData.elemVal;
    }
  }, fieldData, nullCheck);
}

const fillWithChangeEvent = async (fieldData) => {
  await browser.executeScript((fieldData) => {
    let evt = new Event('change');
    const elem = document.getElementById(fieldData.elemId);
    elem.value = fieldData.elemVal;
    elem.dispatchEvent(evt);
  }, fieldData);
}

const fillWithKeypressEvent = async (fieldData) => {
  await browser.executeScript((fieldData) => {
    if (!document.getElementById(fieldData.elemId).value) {
      let evtInput = new Event('input');
      let evtChange = new Event('change');
      let evtKeypress = document.createEvent('KeyboardEvent');
      evtKeypress.initKeyboardEvent('keypress', true, true, window, 0, 0, 0, 0, 0, 'e'.charCodeAt(0));
      const elem = document.getElementById(fieldData.elemId);
      elem.value = fieldData.elemVal;
      elem.dispatchEvent(evtInput);
      elem.dispatchEvent(evtKeypress);
      elem.dispatchEvent(evtChange);
    }
  }, fieldData);
}

const automateLogin = async () => {
  try {
    await browser.executeScript((loginElem, loginCred) => {
      if (document.getElementById(loginElem.usernameId)) {
        document.getElementById(loginElem.usernameId).value = loginCred.username;
      }
      if (document.getElementById(loginElem.passwordId)) {
        document.getElementById(loginElem.passwordId).value = loginCred.password;
      }
      if (document.querySelector(loginElem.submitButton)) {
        document.querySelector(loginElem.submitButton).click();
      }
    }, login, browser.params.login);
  } catch (error) {
    console.log(error);
  }
}

const automateAssignment = async () => {
  try {
    // select <iframe id="gsft_main">
    await browser.switchTo().frame(dashboard.contentIFrameIndex)
      .then(async () => {
        // disable waiting angular execution
        browser.waitForAngularEnabled(false);
        // select all incident links in the page & iterate
        await $$(incidents.linkSelector).each(async (elem, index) => {
          try {
            // filtering only 1 link at once
            if (index < 1) {
              await browser.sleep(1000);
              // wait for 5 secs for the link to be clickable, otherwise it will stop execution here
              await browser.wait(EC.elementToBeClickable($$(incidents.linkSelector).get(incr)), 5000);
              // select the link by using the index from the incr variable & move mouse over it
              await browser.actions().mouseMove($$(incidents.linkSelector).get(incr)).perform()
                .then(async () => await browser.actions().keyDown(protractor.Key.CONTROL).perform()) // Press Control key of keyboard
                .then(async () => await browser.actions().click().perform()) // Click on the link
                .then(async () => await browser.actions().keyUp(protractor.Key.CONTROL).perform()) // Release Control key of keyboard
                .then(async () => {
                  await browser.sleep(1000);
                  // Handles the Windows & Tabs opened under Protractor Testing
                  await browser.getWindowHandle()
                    .then(async (parentGUID) => {
                      // get the all the session ids of the opened tabs
                      await browser.getAllWindowHandles()
                        .then(async (allGUID) => {
                          // console.log('Number of tabs opened: ', allGUID.length);
                          // iterate through the tabs
                          browser.waitForAngularEnabled(false);
                          await allGUID.forEach(async (guid, index) => {
                            //find the new browser tab
                            if (guid != parentGUID) {
                              // switch to the tab
                              await browser.switchTo().window(guid);
                              await browser.sleep(incidents.loadingTime);
                              await browser.takeScreenshot().then((screenShot) => {
                                fs.writeFile('./Last-Incident-Start.png', screenShot, 'base64', (err) => err && console.log);
                              });
                              // perform here any actions needed on the new tab

                              // Impacted User Selection
                              await fillWithoutEvent(updateFields.impactedUser, true);
                              await browser.sleep(updateFields.impactedUser.waitTime);

                              // Category Selection
                              await fillWithChangeEvent(updateFields.category);
                              await browser.sleep(updateFields.category.waitTime);

                              // Sub-Category Selection
                              await fillWithChangeEvent(updateFields.subCategory);
                              await browser.sleep(updateFields.subCategory.waitTime);

                              // Enter Value for Business Service field if empty
                              await fillWithKeypressEvent(updateFields.businessService);
                              await browser.sleep(updateFields.businessService.waitTime);
                              await browser.actions().sendKeys(protractor.Key.ENTER).perform();
                              await browser.actions().sendKeys(protractor.Key.TAB).perform();
                              await browser.sleep(1000);

                              // Enter Value for Configuration Item field if empty
                              // await fillWithKeypressEvent(updateFields.configItem);
                              // await browser.sleep(updateFields.configItem.waitTime);

                              // Contact Type Selection
                              await fillWithoutEvent(updateFields.contactType);
                              await browser.sleep(updateFields.contactType.waitTime);

                              // Enter Value for Assignment Group field if empty
                              await fillWithKeypressEvent(updateFields.assignmentGroup);
                              await browser.sleep(updateFields.assignmentGroup.waitTime);

                              // Enter Value for Assigned To field
                              // console.log('protractor.Key', protractor.Key);
                              await fillWithKeypressEvent(updateFields.assignTo);
                              await browser.actions().click(element(by.id(updateFields.assignTo.elemId))).perform()
                                .then(async () => await browser.actions().sendKeys(protractor.Key.TAB).perform())
                              await browser.sleep(updateFields.assignTo.waitTime);

                              await browser.takeScreenshot().then((screenShot) => {
                                fs.writeFile('./Last-Incident-Assigned.png', screenShot, 'base64', (err) => err && console.log);
                              });
                              await browser.sleep(1000);

                              // Check if the Save and Exit button isclickable or not, if not the execution will stop here
                              await browser.wait(EC.elementToBeClickable(element.all(by.cssContainingText(incidents.saveButton.selector, incidents.saveButton.text)).last()), 5000);
                              // Click on Save and Exit Button
                              await element.all(by.cssContainingText(incidents.saveButton.selector, incidents.saveButton.text)).last().click();
                              // Check if it is redirected to the following url, if not the execution will stop here
                              await browser.wait(EC.urlContains(incidents.verifyURL), incidents.saveButton.waitTime);
                              await browser.sleep(incidents.saveButton.waitTime);
                              // close the new tab
                              await browser.close();
                              // switch back to the parent tab
                              await browser.switchTo().window(parentGUID);
                              await browser.sleep(1000);
                              // refresh the parent tab
                              // await browser.refresh();
                              // Incrementing the incr variable & checking if it is less than the incident link counts
                              if (incr++ < allGUID.length) {
                                // Calling this whole process method again till the condition fails
                                await automateAssignment();
                              }
                            }
                          });
                        })
                    });
                })
            }
          } catch (error) {
            console.log(error);
          }
        })
      })
  } catch (error) {
    console.log(error);
  }
}

describe('Servicenow Automation', () => {
  browser.driver.manage().window().maximize();

  it('Incidents Page', async () => {
    browser.waitForAngularEnabled(false);
    // Opening URL in the Browser
    await browser.driver.get(dashboard.url);

    // Timeout to wait for the URL to be opened in the browser
    setTimeout(async () => {
      await browser.driver.getCurrentUrl().then(async (url) => {
        if (url.indexOf(login.domain) >= 0) {
          await browser.driver.get(url);
          setTimeout(async () => {
            // Calling the process method to login
            await automateLogin();
          }, login.loadingTime);
        }
        // Calling the process method where all tasks are assigned
        await automateAssignment();
      });
    }, dashboard.loadingTime);

    // Minimum time for the process to be executed
    await browser.sleep(dashboard.minExecutionTime);
  });
});