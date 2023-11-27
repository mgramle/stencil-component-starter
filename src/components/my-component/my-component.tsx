import { Component, Event, EventEmitter, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Prop() count: number = 1;

  @Element() el: HTMLElement;

  @Event() componentsAppended: EventEmitter<void>;

  componentDidLoad() {
    // Initially append components
    this.appendWebComponents();
  }

  appendWebComponents() {
    const shadowRoot = this.el.shadowRoot;
    const count = this.count || 1; // Use a default value if count is not provided

    for (let i = 0; i < count; i++) {
      // Create an Ion button
      const ionButton = document.createElement('ion-button');
      ionButton.textContent = `Button`;

      shadowRoot.appendChild(ionButton);
    }

    // Dispatch an event to notify that components have been appended
    this.componentsAppended.emit();
  }

  handleButtonClick() {
    // Append components when the button is clicked
    this.appendWebComponents();
  }

  handleCountChange(event: Event) {
    // Update the count when the input field changes
    const inputElement = event.target as HTMLInputElement;
    this.count = parseInt(inputElement.value, 10);
  }

  render() {
    return (
      <div>
        <label>
          Count:
          <input type="number" value={this.count} onInput={(event) => this.handleCountChange(event)} />
        </label>
        <button onClick={() => this.handleButtonClick()}>Append Buttons</button>
      </div>
    );
  }
}