import "./petCard.css";

export default function PetCard() {
  function getMockDogs() {
    return [
      {
        name: "mock",
        breed: "mock",
        age: 5,
        weight: 20,
        description: "mock",
        owner: "mock",
        rabies_vaccination: "mock",
        employee_notes: "mock",
      },
    ];
  }
  return <div className="pet-card"></div>;
}
