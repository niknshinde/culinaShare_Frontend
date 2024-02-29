import React, { useContext, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import backendContext from "../contex/backend/backendContext";
import RenderCards from "./RenderCards";

const SearchRecipes = () => {
  const context = useContext(backendContext);
  const { host } = context;

  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) {
        setErrorMessage("Please enter something to search.");
        return;
      }

      const response = await fetch(`${host}/api/foodresp/search-recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: searchTerm }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setRecipes([]);
        setErrorMessage(errorData.msg);
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  const findOptionRecipe = async (option) => {
    try {
      const response = await fetch(`${host}/api/foodresp/search-recipe-base-options`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ options: option }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setRecipes([]);
        setErrorMessage(errorData.msg);
      }
    } catch (error) {
      console.error("Error searching recipes by option:", error);
    }
  };

  return (
    <div>
      <h2>Search Recipes</h2>
      <Form
        className="search_bar_form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <InputGroup className="mb-3 search_bar">
          <FormControl
            className="pt-3 pb-3 pl-5  search_bar_box"
            placeholder="Search for recipes"
            aria-label="Search for recipes"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className=" search-btn"
            variant="outline-secondary"
            id="button-addon2"
            type="submit"
          >
            Search
          </Button>
        </InputGroup>
      </Form>

      <div className="options_menu">
        {/* <div className="inner_option_menu" onClick={async() => await findOptionRecipe("starter")}>
          <img className="aniLogos" src="/images/food-delivery.gif" alt="" />
          <p>starter</p>
        </div> */}

        <div className="inner_option_menu" onClick={async() => await findOptionRecipe("vegetarian")}>
          <img className="aniLogos" src="/images/salad.gif" alt="" />
          <p>vegetarian</p>
        </div>

        <div className="inner_option_menu" onClick={async() => await findOptionRecipe("non vegetarian")}>
          <img className="aniLogos" src="/images/meat.gif" alt="" />
          <p>non-vegetarian</p>
        </div>

        <div className="inner_option_menu" onClick={async() => await findOptionRecipe("dessert")}>
          <img className="aniLogos" src="/images/cake.gif" alt="" />
          <p>dessert</p>
        </div>

        <div className="inner_option_menu" onClick={async() => await findOptionRecipe("quick recipes")} >
          <img className="aniLogos" src="/images/cookbook.gif" alt="" />
          <p>quick recipes</p>
        </div>
      </div>

      {errorMessage && <p>{errorMessage}</p>}
      {recipes.length > 0 && <RenderCards recipes={recipes} />}
    </div>
  );
};

export default SearchRecipes;
