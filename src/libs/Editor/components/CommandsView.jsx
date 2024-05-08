import { Component } from 'react';

export class CommandsView extends Component {
  state = {
    selectedIndex: null,
  };

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown(event) {
    if (event.key === 'ArrowUp') {
      this.upHandler();
      return true;
    }

    if (event.key === 'ArrowDown') {
      this.downHandler();
      return true;
    }

    if (event.key === 'Enter') {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        ((this.state.selectedIndex || 0) + this.props.items.length - 1) %
        this.props.items.length,
    });
  }

  downHandler() {
    this.setState({
      selectedIndex:
        this.state.selectedIndex === null
          ? 0
          : ((this.state.selectedIndex || 0) + 1) % this.props.items.length,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index) {
    const item = this.props.items[index || 0];

    if (item) {
      this.props.command(item);
    }
  }

  render() {
    const { items } = this.props;

    return (
      <ul className="insert-menu shadow-lg rounded-lg bg-white w-64 max-h-64 overflow-y-scroll">
        {items.map((item, index) => (
          <li key={index}>
            <button
              type="button"
              className={`w-full p-2 flex flex-row gap-2 items-center hover:bg-accent ${index === this.state.selectedIndex ? 'active' : ''}`}
              {...item.attrs}
              onClick={() => this.selectItem(index)}
            >
              {item.icon}
              <b>{item.element || item.title}</b>
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
