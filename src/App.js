import { useState } from "react";
import Header from "./components/Calculator/Header";
import CalcForm from "./components/Form/CalcForm";
import Result from "./components/ResultTable/Results";

function App() {
  const [userInput, setUserInput] = useState(null);
  const calculateHandler = (userInput) => {
    setUserInput(userInput);
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...
  };
  const yearlyData = []; // per-year results

  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <CalcForm onCalculate={calculateHandler} />
      {/* outputting conditional rendering */}
      {!userInput && (
        <p style={{ textAlign: "center" }}> No investment found yet.</p>
      )}
      {userInput && (
        <Result
          data={yearlyData}
          intialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
