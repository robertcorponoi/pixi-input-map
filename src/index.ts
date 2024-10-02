export class PixiInputMap {
    /** Used to keep track of what keys or mouse buttons are currently pressed. */
    keys: { [key: string]: boolean } = {};

    /**
     * A map of the actions added to the key codes or mouse buttons.
     *
     * The key is the name of the action and the value is the key code or
     * mouse button. Key codes should be taken from:
     * https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
     * and mouse buttons should be taken from:
     * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
     * although some mice might have less or more buttons.
     */
    actions: { [key: string]: string | number } = {};

    /**
     * Sets the key or mouse button that was pressed to `true` in the `keys`
     * object. This is used as the callback for the key or mouse down event.
     *
     * @private
     *
     * @param {KeyboardEvent|MouseEvent} event The key or mouse down event.
     */
    private _keyOrMouseButtonDownListener = (
        event: KeyboardEvent | MouseEvent,
    ) => {
        this.keys[event instanceof KeyboardEvent ? event.key : event.button] =
            true;
    };

    /**
     * Sets the key or mouse button that was pressed to `false` in the `keys`
     * object. This is used as the callback for the key or mouse up event.
     *
     * @private
     *
     * @param {KeyboardEvent|MouseEvent} event The key or m ouse up event.
     */
    private _keyOrMouseButtonUpListener = (
        event: KeyboardEvent | MouseEvent,
    ) => {
        this.keys[event instanceof KeyboardEvent ? event.key : event.button] =
            false;
    };

    /**
     * Returns the key or mouse button for a specified action. If there's no
     * action with the specified name, it will return `undefined`.
     *
     * @private
     *
     * @param {string} name The name of the action to get the key or mouse button for.
     *
     * @returns {string|number|undefined} The key or mouse button for the action. If there's no action with the specified name, it will return `undefined`.
     */
    private _getActionKeyOrMouseButton = (
        name: string,
    ): string | number | undefined => {
        return this.actions[name];
    };

    /**
     * Adds the event listeners for key and mouse presses and releases so that
     * when a key or mouse button is pressed or released, it will be set in the
     * `keys` object.
     *
     * This should be used when you want to start listening for key and mouse
     * events, such as when the game starts.
     *
     * This should not be called inside of any function that is called once
     * per frame. It should only be called once.
     *
     * @example
     *
     * ```
     * const app = new Application();
     * await app.init();
     *
     * const inputMap = new PixiInputMap();
     * inputMap.start();
     * ```
     */
    start = () => {
        window.addEventListener("keydown", this._keyOrMouseButtonDownListener);
        window.addEventListener("keyup", this._keyOrMouseButtonUpListener);

        window.addEventListener(
            "mousedown",
            this._keyOrMouseButtonDownListener,
        );
        window.addEventListener("mouseup", this._keyOrMouseButtonUpListener);
    };

    /**
     * Removes the event listeners for key and mouse presses and releases and
     * clears the `keys` object.
     *
     * This should be used when you want to stop listening for key and mouse
     * events, such as when the game ends.
     *
     * @example
     *
     * ```
     * const app = new Application();
     * await app.init();
     *
     * const inputMap = new PixiInputMap();
     * inputMap.start();
     *
     * inputMap.stop();
     * ```
     */
    stop = () => {
        window.removeEventListener(
            "keydown",
            this._keyOrMouseButtonDownListener,
        );
        window.removeEventListener("keyup", this._keyOrMouseButtonUpListener);

        window.removeEventListener(
            "mousedown",
            this._keyOrMouseButtonDownListener,
        );
        window.removeEventListener("mouseup", this._keyOrMouseButtonUpListener);

        this.keys = {};
    };

    /**
     * Adds an action to associate with a key or mouse button.
     *
     * For example, if you want to add an action called "jump" that is
     * triggered by the space bar, you would call `addAction("jump", "Space")`.
     * Then, in your game loop or update function, you can check if the "jump"
     * action is pressed by calling `isActionPressed("jump")` and if the user
     * is pressing the space bar, it will return `true`.
     *
     * @param {string} name The name of the action. This is not checked for uniqueness so if you specify the same name twice, it will overwrite the previous action.
     * @param {string|number} event The key or mouse button that triggers the action. Key codes should be taken from https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values and mouse buttons should be taken from https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button although some mice might have less or more buttons.
     *
     * @example
     *
     * ```
     * const inputMap = new PixiInputMap();
     * inputMap.addAction("jump", "Space");
     * ```
     */
    addAction = (name: string, event: string | number) => {
        this.actions[name] = event;
    };

    /**
     * Simulates pressing the specified action. If the action doesn't exist,
     * nothing will happen.
     *
     * This can be used for testing or taking actions on behalf of the user.
     *
     * @param {string} name The name of the action to press.
     *
     * @example
     *
     * ```
     * const inputMap = new PixiInputMap();
     *
     * inputMap.addAction("jump", "Space");
     * inputMap.actionPress("jump");
     * ```
     */
    actionPress = (name: string) => {
        const actionKeyOrMouseButton = this._getActionKeyOrMouseButton(name);
        if (!actionKeyOrMouseButton) return;

        this.keys[actionKeyOrMouseButton] = true;
    };

    /**
     * Simulates releasing the specified action. If the action doesn't exist,
     * nothing will happen.
     *
     * @param {string} name The name of the action to release.
     *
     * @example
     *
     * ```
     * const inputMap = new PixiInputMap();
     *
     * inputMap.addAction("jump", "Space");
     *
     * inputMap.actionPress("jump");
     * inputMap.actionRelease("jump");
     * ```
     */
    actionRelease = (name: string) => {
        const actionKeyOrMouseButton = this._getActionKeyOrMouseButton(name);
        if (!actionKeyOrMouseButton) return;

        this.keys[actionKeyOrMouseButton] = false;
    };

    /**
     * Returns whether the key or mouse button for the action is pressed or
     * not.
     *
     * This should be used in your game loop or update function to check if
     * the user is pressing a key or mouse button that is associated with an
     * action.
     *
     * @param {string} name The name of the action to check if it's pressed or not.
     *
     * @returns {boolean} Returns whether the key or mouse button for the action is pressed.
     *
     * @example
     *
     * ```
     * const app = new Application();
     * await app.init();
     *
     * const inputMap = new PixiInputMap();
     *
     * inputMap.addAction("jump", "Space");
     *
     * app.ticker.add((time) => {
     *     const isJumping = inputMap.isActionPressed("jump");
     *     // Do something if the player is jumping.
     * });
     * ```
     */
    isActionPressed = (name: string): boolean => {
        const actionKeyOrMouseButton = this._getActionKeyOrMouseButton(name);
        if (!actionKeyOrMouseButton) return false;

        return this.keys[actionKeyOrMouseButton] || false;
    };

    /**
     * Returns whether the specified key is pressed or not.
     *
     * @param {string} key The key to check if it's pressed or not. Key codes should be taken from https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values.
     *
     * @returns {boolean} Returns whether the key is pressed or not.
     *
     * @example
     *
     * ```
     * const app = new Application();
     * await app.init();
     *
     * const inputMap = new PixiInputMap();
     *
     * app.ticker.add((time) => {
     *     const isJumping = inputMap.isKeyPressed("Space");
     *     // Do something if the player is jumping.
     * });
     * ```
     */
    isKeyPressed = (key: string): boolean => {
        return this.keys[key];
    };

    /**
     * Returns whether the specified mouse button is pressed or not.
     *
     * @param {number} button The mouse button to check if it's pressed or not. Mouse buttons should be taken from https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button although some mice might have less or more buttons.
     *
     * @returns {boolean} Returns whether the mouse button is pressed or not.
     *
     * @example
     *
     * ```
     * const app = new Application();
     * await app.init();
     *
     * const inputMap = new PixiInputMap();
     *
     * app.ticker.add((time) => {
     *     const isJumping = inputMap.isMouseButtonPressed(0);
     *     // Do something if the player is jumping.
     * });
     * ```
     */
    isMouseButtonPressed = (button: number): boolean => {
        return this.keys[button];
    };

    /**
     * Returns whether any key or mouse button is pressed or not.
     *
     * @returns {boolean} Returns whether any key or mouse button is pressed or not. Key codes should be taken from https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values and mouse buttons should be taken from https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button although some mice might have less or more buttons.
     *
     * @example
     *
     * ```
     * const inputMap = new PixiInputMap();
     *
     * if (inputMap.isAnythingPressed()) {
     *    // Do something if any key or mouse button is pressed.
     * }
     * ```
     */
    isAnythingPressed = (): boolean => {
        return Object.values(this.keys).some((key) => key === true);
    };
}
