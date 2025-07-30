import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import styles from "./Markdown.module.css";
import { marked } from "marked";
// This component allows users to write markdown text and see the preview in real-time

// Initial text to be displayed in the editor
// This text contains various markdown elements like headings, code blocks, lists, etc.
const initialText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![Cute Dog](https://picsum.photos/id/237/200/300)

`;

// Main Markdown component
// It contains the editor for writing markdown and a preview section to see the rendered output
const Markdown = () => {
  const [textValue, setTextValue] = useState<string>(initialText);

  // Change handler for the textarea to update the textValue state
  // This function is called whenever the user types in the editor
  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const home = `< Home`;

  // Render method to display the Markdown component
  // It includes a link to go back home, the editor for writing markdown, and the preview section
  // The editor allows users to type markdown text, and the preview section shows the rendered HTML
  return (
    <>
      <a id={styles.a} href="/">
        {home}
      </a>
      <div className={styles.markdownContainer}>
        <Editor value={textValue} onChange={changeHandler} />
        <Preview toModifyData={textValue} />
      </div>
    </>
  );
};

// Smiley and pray symbols to be used in the header
// These symbols are displayed in the header of the editor and preview sections
const smiley = "(*_*)";
const pray = "_/\\_";

// Header component to display the title of the editor or preview section
// It takes a prop 'title' to display the title text
type HeaderProps = {
  title: string;
};

// Header component to display the title of the editor or preview section
// It takes a prop 'title' to display the title text
const Header = ({ title }: HeaderProps) => {
  return (
    <div className={styles.headerContainer}>
      <div>
        {smiley} {title}
      </div>
      <div>{pray}</div>
    </div>
  );
};

// Editor component to render the markdown editor
// It contains a textarea for users to write markdown text
type EditorProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

// Editor component to render the markdown editor
// It contains a textarea for users to write markdown text
const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <div className={styles.editorContainer}>
      <Header title="Editor" />
      <textarea id={styles.editor} value={value} onChange={onChange} />
    </div>
  );
};

// Preview component to render the markdown preview
// It takes the markdown text as a prop and renders it as HTML
type PreviewProps = {
  toModifyData: string;
};

// Preview component to render the markdown preview
// It takes the markdown text as a prop and renders it as HTML
const Preview = ({ toModifyData }: PreviewProps) => {
  const [data, setData] = useState<string>("");
  const dataModifier = (data: string) => {
    const modifiedData = marked.parse(data);
    return modifiedData;
  };

  // Effect hook to modify the markdown data when the toModifyData changes
  // It uses the marked library to parse the markdown text into HTML
  useEffect(() => {
    const dataModified = dataModifier(toModifyData);
    setData(dataModified);
  }, [toModifyData]);

  // Render method to display the Preview component
  // It includes a header and a div to show the rendered HTML
  return (
    <div className={styles.previewContainer}>
      <Header title="Preview" />
      <div id={styles.preview} dangerouslySetInnerHTML={{ __html: data }}></div>
    </div>
  );
};

export default Markdown;
