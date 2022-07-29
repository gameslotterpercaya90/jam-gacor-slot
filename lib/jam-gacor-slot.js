'use babel';

import JamGacorSlotView from './jam-gacor-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  jamGacorSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jamGacorSlotView = new JamGacorSlotView(state.jamGacorSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jamGacorSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jam-gacor-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jamGacorSlotView.destroy();
  },

  serialize() {
    return {
      jamGacorSlotViewState: this.jamGacorSlotView.serialize()
    };
  },

  toggle() {
    console.log('JamGacorSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
