import React, { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

// ---------Charts Dummy Data
// const chartData = [
//   {
//     label: "HTML",
//     value: "28",
//   },
//   {
//     label: "CSS",
//     value: "2",
//   },
//   {
//     label: "JavaScript",
//     value: "90",
//   },
// ];

const Repos = () => {
  const { repos } = useContext(GithubContext);
  //Making Languages Object
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (total[language]) {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    } else {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    }
    return total;
  }, {});
  //Most Used Language  from all Repos
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  //Most Stars per language from all Repos
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return {
        ...item,
        value: item.stars,
      };
    })
    .slice(0, 5);

  // Most Stars and Most Forked Repos
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { name, stargazers_count, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );
  stars = Object.values(stars).reverse().slice(0, 5);
  forks = Object.values(forks).reverse().slice(0, 5);

  return (
    <>
      <section className="section">
        <Wrapper className="section-center">
          <Pie3D data={mostUsed} />
          <Column3D data={stars} />
          <Doughnut2D data={mostPopular} />
          <Bar3D data={forks} />
        </Wrapper>
      </section>
    </>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
