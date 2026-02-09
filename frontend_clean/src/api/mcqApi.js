export const fetchMcqs = async (course, year) => {
  const res = await fetch(
    `http://localhost:5001/api/mcqs?course=${course}&year=${year}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch MCQs");
  }

  return res.json();
};
