import userEvent from "@testing-library/user-event";

import pixiInputMap from "../src/index";

/** Sets up the `@testing-library/user-event` keyboard and mouse events. */
const user = userEvent.setup();

/** Before each test is run we start listening for keyboard and mouse events. */
beforeEach(() => {
    pixiInputMap.start();
});

/**
 * After each test is run, we stop listening for keyboard and mouse events
 * and clear the events that happened.
 */
afterEach(() => {
    pixiInputMap.stop();
});

describe("Key events should be logged in the `keys` object", () => {
    it("should set a key being pressed and held as `true` in the `keys` object", async () => {
        await user.keyboard("{a>}");
        expect(pixiInputMap.isKeyPressed("a")).toBe(true);
    });

    it("should set multiple keys being pressed and held as `true` in the `keys` object", async () => {
        await user.keyboard("{a>}{4>}{Space>}");

        expect(pixiInputMap.isKeyPressed("a")).toBe(true);
        expect(pixiInputMap.isKeyPressed("4")).toBe(true);
        expect(pixiInputMap.isKeyPressed("Space")).toBe(true);
    });

    it("should set a key that was pressed and released as `false` in the `keys` object", async () => {
        await user.keyboard("{a>}");
        await user.keyboard("{/a}");
        expect(pixiInputMap.isKeyPressed("a")).toBe(false);
    });

    it("should set multiple keys that were pressed and released as `false` in the `keys` object", async () => {
        await user.keyboard("{a>}{4>}{Space>}");
        await user.keyboard("{/a}{/4}{/Space}");

        expect(pixiInputMap.isKeyPressed("a")).toBe(false);
        expect(pixiInputMap.isKeyPressed("4")).toBe(false);
        expect(pixiInputMap.isKeyPressed("Space")).toBe(false);
    });

    it("should set the correct state of multiple keys being pressed and released", async () => {
        await user.keyboard("{a>}{4>}{Space>}{t>}");
        await user.keyboard("{/a}{4>}{/Space}{t>}");

        expect(pixiInputMap.isKeyPressed("a")).toBe(false);
        expect(pixiInputMap.isKeyPressed("4")).toBe(true);
        expect(pixiInputMap.isKeyPressed("Space")).toBe(false);
        expect(pixiInputMap.isKeyPressed("t")).toBe(true);
    });
});

describe("Mouse events should be logged in the `keys` object", () => {
    it("should set the left mouse button being pressed and held as `true` in the `keys` object", async () => {
        await user.pointer("[MouseLeft>]");
        expect(pixiInputMap.isMouseButtonPressed(0)).toBe(true);
    });

    it("should set the left mouse button being pressed and released as `false` in the `keys` object", async () => {
        await user.pointer("[MouseLeft>]");
        await user.pointer("[/MouseLeft]");

        expect(pixiInputMap.isMouseButtonPressed(0)).toBe(false);
    });
});

describe("Adding actions", () => {
    it("should add an action to the `actions` object", () => {
        pixiInputMap.addAction("jump", "Space");
        expect(pixiInputMap.actions["jump"]).toBe("Space");
    });
});

describe("Checking actions", () => {
    it("should return `true` that an action is being used", async () => {
        pixiInputMap.addAction("jump", "Space");
        await user.keyboard("{Space>}");

        const isJumping = pixiInputMap.isActionPressed("jump");
        expect(isJumping).toBe(true);
    });

    it("should return `false` since an action is not being used", async () => {
        pixiInputMap.addAction("jump", "Space");
        await user.keyboard("{a}");

        const isJumping = pixiInputMap.isActionPressed("jump");
        expect(isJumping).toBe(false);
    });

    it("should return `false` since an action was used but is not anymore", async () => {
        pixiInputMap.addAction("jump", "Space");
        await user.keyboard("{Space>}");
        await user.keyboard("{/Space}");

        const isJumping = pixiInputMap.isActionPressed("jump");
        expect(isJumping).toBe(false);
    });
});

describe("Manually triggering actions", () => {
    it("should return `true` when the action is manually triggered", () => {
        pixiInputMap.addAction("jump", "Space");
        pixiInputMap.actionPress("jump");

        expect(pixiInputMap.isActionPressed("jump")).toBe(true);
    });

    it("should return `false` when the action is manually triggered and then released", () => {
        pixiInputMap.addAction("jump", "Space");

        pixiInputMap.actionPress("jump");
        pixiInputMap.actionRelease("jump");

        expect(pixiInputMap.isActionPressed("jump")).toBe(false);
    });
});

describe("Checking if any key is pressed", () => {
    it("should return `true` when any key is pressed", async () => {
        await user.keyboard("{a>}");
        expect(pixiInputMap.isAnythingPressed()).toBe(true);
    });

    it("should return `false` when no key is pressed", async () => {
        await user.keyboard("{a>}");
        await user.keyboard("{/a}");

        expect(pixiInputMap.isAnythingPressed()).toBe(false);
    });
});
