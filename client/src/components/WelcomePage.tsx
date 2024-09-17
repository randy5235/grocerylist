import * as styles from '../styles/WelcomePage.module.css';

export default function WelcomePage() {
  return (
    <div className={styles}>
   <h1>Welcome to the Todo list site!</h1>
   <p>Hopefully, you can put this todo list site to use. You can also create shared todo lists and email a person to add them to any given list.</p>
    </div>
  );
}