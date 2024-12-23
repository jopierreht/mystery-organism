// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Step 3:
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const originalBase = this.dna[randomIndex];

      let newBase;
      do {
        newBase = returnRandBase();
      } while (newBase === originalBase);

      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(pAequorOther) {
      let similarityCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequorOther.dna[i]) {
          similarityCount++;
        }
      }

      const similarityPercentage = ((similarityCount / this.dna.length) * 100);

      console.log(`Specimen #${this.specimenNum} and Specimen #${pAequorOther.specimenNum} have ${similarityPercentage}% DNA in common!`);
      return similarityPercentage;
    },
    willLikelySurvive() {
      const cAndGCount = this.dna.reduce((count, base) => {
        if (base === 'C' || base === 'G') {
          count++;
        }
        return count;
      }, 0);
      return (cAndGCount / this.dna.length) >= 0.6;
    }
  };
};

// Create 30 instances of pAequor that are likely to survice
const createSurvivingSpecimens = () => {
  const survivingSpecimens = [];
  let specimenNum = 1;

  while (survivingSpecimens.length < 30) {
    const newDNA = mockUpStrand();
    const specimen = pAequorFactory(specimenNum, newDNA);

    if (specimen.willLikelySurvive()) {
      survivingSpecimens.push(specimen);
    }

    specimenNum++;
  }

  return survivingSpecimens;
};

const specimens = createSurvivingSpecimens();








