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

  selectItem(item) {
    if (item) {
      this.props.command(item);
    }
  }

  render() {
    const { items } = this.props;
    const groupMap = items.reduce((group, item) => {
      if (!group.has(item.group)) {
        group.set(item.group, []);
      }
      group.get(item.group).push(item);
      return group;
    }, new Map());
    const groups = [...groupMap.entries()];

    return (
      <ul className="insert-menu shadow-lg rounded-lg bg-white w-64 p-2 max-h-64 overflow-y-scroll">
        {groups.map(([groupName, items]) => (
          <div key={groupName}>
            <hr className="my-2" />
            <p className="ml-4 my-1 text-grey-400 font-bold">{groupName}</p>
            {items.map((item, index) => (
              <li key={item.title}>
                <button
                  type="button"
                  className={`w-full p-2 flex flex-row gap-2 items-center rounded-lg hover:bg-accent ${index === this.state.selectedIndex ? 'active' : ''}`}
                  {...item.attrs}
                  onClick={() => this.selectItem(item)}
                >
                  {item.icon}
                  <span>{item.element || item.title}</span>
                </button>
              </li>
            ))}
          </div>
        ))}
      </ul>
    );
  }
}
