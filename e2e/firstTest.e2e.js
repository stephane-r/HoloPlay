describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have login screen", async () => {
    await expect(element(by.id("login-form"))).toBeVisible();
  });
});
