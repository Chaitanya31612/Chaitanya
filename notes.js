const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNote();
  // const duplicateNotes = notes.filter(note => note.title === title);
  //filter method create an array of dupicate items and doesn't stop even if it find a match at first place
  const duplicateNote = notes.find(note => note.title === title);
  // find method search for duplicate and search for occurence. If match is not found it returns undefined

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    saveNote(notes);
    console.log(chalk.green.bold("New note added!"));
  } else {
    console.log(chalk.red.bold("Note title already taken!"));
  }
};

const removeNote = title => {
  const notes = loadNote();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notesToKeep.length === notes.length) {
    // console.log(`No item with title ${title} found`);
    console.log(chalk.bold.red("No note found"));
  } else if (notesToKeep.length < notes.length) {
    saveNote(notesToKeep);
    console.log(chalk.bold.green("Note removed"));
    // console.log(`Note with title ${title} deleted`);
  }
};

const listNotes = () => {
  console.log(chalk.inverse(getNotes()));
  // console.log(getNotes());
  const notes = loadNote();
  notes.forEach(note => console.log(note.title));
};

const readNote = title => {
  const notes = loadNote();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.inverse(title));
    console.log(note.body);
  } else {
    console.log(chalk.red.bold("No note found"));
  }
};

const saveNote = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNote = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};

// For debugging we need to run in console node inspect app.js add --title......
// in chrome we need to go to chrome://inspect
