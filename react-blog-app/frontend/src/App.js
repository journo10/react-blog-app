import Container from "./components/Container";
import { useTheme } from "./context/ThemeContext"
import "./App.css"

function App() {
  const { theme } = useTheme()

  return (
    <div className={`app ${theme}`}>
      <Container  />
    </div>
  );
}

export default App;


//NOT => TEMA KISMI OLMADI SIKINTILI ÇALIŞIYOR,SONRA TEKRAR BAK