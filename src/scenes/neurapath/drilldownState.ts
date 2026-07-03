// Shared mutable flag: true while the pointer is inside the BookViewer.
// useDeck's global keydown handler checks this so its own arrow-key
// navigation doesn't fire while the user is browsing the book.
export const drilldownState = { active: false };
