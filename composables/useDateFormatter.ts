// composables/useDateFormatter.ts

export const useDateFormatter = () => {
  const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const year: number = date.getFullYear();
      const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day: string = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  };

  const parseDate = (dateString: string): string => {
      const [year, month, day] = dateString.split('-').map(Number);
      if (isNaN(year) || isNaN(month) || isNaN(day)) {
          throw new Error('Invalid date string format');
      }
      return new Date(year, month - 1, day).toDateString();
  };

  return {
      formatDate,
      parseDate,
  };
};
