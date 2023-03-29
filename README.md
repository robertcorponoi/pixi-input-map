<div align="center">

# **Pixi Input Map**

Pixi Input Map is used to manage input actions which are named events tied to
a key or mouse button.

</div>

**Note:** This library is in beta and currently doesn't require
[Pixi](https://github.com/pixijs/pixijs) and has other limitations which are
in progress. Please read the [What's Next](#whats-next) section to learn more.

-   [Install](#install)
-   [Usage](#usage)
    -   [Importing](#importing)
    -   [Starting the Listeners](#starting-the-listeners)
    -   [Using Actions](#using-actions)
    -   [Manually Triggering and Releasing Actions](#manually-triggering-and-releasing-actions)
    -   [Checking If a Key or Mouse Button Is Pressed](#checking-if-a-key-or-mouse-button-is-pressed)
    -   [Checking If Anything Is Pressed](#checking-if-anything-is-pressed)
-   [API](#api)
    -   [start](#start)
    -   [stop](#stop)
    -   [addAction](#addaction)
    -   [isActionPressed](#isactionpressed)
    -   [actionPress](#actionpress)
    -   [actionRelease](#actionrelease)
    -   [isKeyPressed](#iskeypressed)
    -   [isMouseButtonPressed](#ismousebuttonpressed)
    -   [isAnythingPressed](#isanythingpressed)
-   [License](#license)

## **Install**

```sh
npm install pixi-input-map
```

## **Usage**

Pixi Input Map exports a singleton because there should only ever be once
instance of it since it attaches event listeners to the `window` for the
keyboard and mouse.

### **Importing**

To import it, use:

```ts
import pixiInputMap from "pixi-input-map";
```

### **Starting the Listeners**

Next, to start listening for events, you have to call the `start` method:

```ts
pixiInputMap.start();
```

This is not automatic because you might not want to start listening to events
right away. You can call this when your game starts or just whenever you're
ready to start handling input.

**Note:** There's also a `stop` method, which removes the event listeners and
cleans up the internal cache.

### **Using Actions**

At this point, you can create an action with a name and the key/mouse button
that triggers it.

```ts
pixiInputMap.addAction("jump", "Space");
```

Now, in your game loop, you can check for the action being used.

```ts
const gameLoop = (delta: number) => {
    const isJumping = pixiInputMap.isActionPressed("jump");
};
```

## **Manually Triggering and Releasing Actions**

You can also manually trigger actions without user input with the
`actionPress` and `actionRelease` methods.

**Note:** You'll have to call `actionRelease` after `actionPress` or else it
will behave as if the user is holding down the action.

```ts
pixiInputMap.addAction("jump", "Space");

pixiInputMap.actionPress("jump");
pixiInputMap.actionRelease("jump");
```

## **Checking If a Key or Mouse Button Is Pressed**

Along with checking if actions are being used, you can also check if a
specific key or mouse button is being pressed or not.

```ts
const isSpacePressed = pixiInputMap.isKeyPressed("Space");

const isLeftMouseButtonPressed = pixiInputMap.isMouseButtonPressed(0);
```

## Checking If Anything Is Pressed\*\*

You can also check to see if any key or mouse button is pressed. This could be
useful in situations where you want to take an action if the user interacts
with the game at all.

```ts
const isAnythingPressed = pixiInputMap.isAnythingPressed();
```

## **API**

### **start**

Starts listening for keyboard and mouse events.

**Example**

```ts
pixiInputMap.start();
```

### **stop**

Stops listening for keyboard and mouse events and resets the internal cache.

**Example**

```ts
pixiInputMap.stop();
```

### **addAction**

Adds an action with a keyboard key or mouse button that triggers the event.

| Param | Description                                                      |
| ----- | ---------------------------------------------------------------- |
| name  | The name of the action, used when checking if it is used or not. |
| key   | The keyboard key or mouse button that triggers the event.        |

**Note:** The param is named `key` but it can be a keyboard key or mouse button.

They key should be taken from the
[MDN KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
docs.

Mouse buttons will vary based on the mouse but general information can be
found on the
[MDN MouseEvent.button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
docs.

**Example**

```ts
pixiInputMap.addAction("jump", "Space");
```

### **isActionPressed**

Returns whether the action with the specified name is being used or not. This
should be checked in your game loop.

| Param | Description                                           |
| ----- | ----------------------------------------------------- |
| name  | The name of the action to check if being used or not. |

**Example**

```ts
pixiInputMap.addAction("jump", "Space");

const gameLoop = () => {
    const isJumping = pixiInputMap.isActionPressed("jump");
};
```

### **actionPress**

Manually triggers an action. This is equivalent to the user pressing and
holding the key or mouse button.

**Note:** You'll have to call `actionRelease` to simulate the user releasing
the key or mouse button.

| Param | Description                      |
| ----- | -------------------------------- |
| name  | The name of the action to press. |

**Example**

```ts
pixiInputMap.addAction("jump", "Space");
pixiInputMap.pressAction("jump");
```

### **actionRelease**

Manually releases an action. This is equivalent to the user releasing the key
or mouse button.

| Param | Description                        |
| ----- | ---------------------------------- |
| name  | The name of the action to release. |

**Example**

```ts
pixiInputMap.addAction("jump", "Space");

pixiInputMap.pressAction("jump");
pixiInputMap.releaseAction("jump");
```

### **isKeyPressed**

Returns whether the specified key is being used or not. This should be checked
in your game loop.

| Param | Description                     |
| ----- | ------------------------------- |
| key   | The key to check if being used. |

**Example**

```ts
const isSpacePressed = pixiInputMap.isKeyPressed("Space");
```

### **isMouseButtonPressed**

Returns whether the specified mouse button is being used or not. This should
be checked in your game loop.

| Param       | Description                              |
| ----------- | ---------------------------------------- |
| mouseButton | The mouse button to check if being used. |

**Example**

```ts
const isLeftMouseButtonPressed = pixiInputMap.isMouseButtonPressed(0);
```

### **isAnythingPressed**

Returns whether any key or mouse button is being used or not. This should be
checked in your game loop.

**Example**

```ts
const isAnythingPressed = pixiInputMap.isAnythingPressed();
```

## **License**

[MIT](./LICENSE)
