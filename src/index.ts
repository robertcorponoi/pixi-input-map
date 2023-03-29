class PixiInputMap {
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
     * The event listener for the key or mouse down event.
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
     * The event listener for the key or mouse up event.
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
     * Returns the key or mouse button for a specified action. If not found,
     * this will log a warning and return `undefined`.
     *
     * @private
     *
     * @param {string} name The name of the action.
     *
     * @returns {string|number} The key or mouse button for the action.
     */
    private _getActionKeyOrMouseButton = (
        name: string,
    ): string | number | undefined => {
        return this.actions[name];
    };

    /**
     * Adds the event listeners for key and mouse presses and releases and
     * updates the `keys` or `mouseButtons` object.
     *
     * This should be used when your game is loaded or just whenever you are
     * ready to start listening for input.
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
     * Adds an action to the `InputMap` with a name and a key or mouse button.
     *
     * @param {string} name The name of the action.
     * @param {string|number} event The key or mouse button that triggers the action.
     */
    addAction = (name: string, event: string | number) => {
        this.actions[name] = event;
    };

    /**
     * Simulates pressing the specified action.
     *
     * @param {string} name The name of the action to press.
     */
    actionPress = (name: string) => {
        const actionKeyOrMouseButton = this._getActionKeyOrMouseButton(name);
        if (!actionKeyOrMouseButton) return;

        this.keys[actionKeyOrMouseButton] = true;
    };

    /**
     * If the action is pressed, this will release it.
     *
     * @param {string} name The name of the action to release.
     */
    actionRelease = (name: string) => {
        const actionKeyOrMouseButton = this._getActionKeyOrMouseButton(name);
        if (!actionKeyOrMouseButton) return;

        this.keys[actionKeyOrMouseButton] = false;
    };

    /**
     * Indicates whether the key or mouse button for the action is pressed.
     *
     * @param {string} name The name of the action to check.
     *
     * @returns {boolean} Whether the key or mouse button for the action is pressed.
     */
    isActionPressed = (name: string): boolean => {
        const actionKeyOrMouseButton = this._getActionKeyOrMouseButton(name);
        if (!actionKeyOrMouseButton) return false;

        return this.keys[actionKeyOrMouseButton] || false;
    };

    /**
     * Indicates whether the specified key is pressed or not.
     *
     * @param {string} key The key to check.
     *
     * @returns {boolean} Whether the key is pressed or not.
     */
    isKeyPressed = (key: string): boolean => {
        return this.keys[key];
    };

    /**
     * Indicates whether the specified mouse button is pressed or not.
     *
     * @param {number} button The mouse button to check.
     *
     * @returns {boolean} Whether the mouse button is pressed or not.
     */
    isMouseButtonPressed = (button: number): boolean => {
        return this.keys[button];
    };

    /**
     * Indicates whether any key or mouse button is pressed or not.
     *
     * @returns {boolean} Whether any key or mouse button is pressed or not.
     */
    isAnythingPressed = (): boolean => {
        return Object.values(this.keys).some((key) => key === true);
    };
}

export default new PixiInputMap();
