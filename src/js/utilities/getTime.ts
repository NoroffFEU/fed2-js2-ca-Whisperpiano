// Function to get time difference between two dates and return it in a readable format

export function getTime(date: Date) {
  const dateNow = new Date();
  const targetDate = new Date(date);

  const differenceInMilliseconds = dateNow.getTime() - targetDate.getTime();

  if (differenceInMilliseconds < 59_999) {
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    return `${differenceInSeconds}sec`;
  }

  if (differenceInMilliseconds < 3_599_999) {
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / (1000 * 60)
    );
    return `${differenceInMinutes} min`;
  }
  if (differenceInMilliseconds < 86_399_999) {
    const differenceInHours = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60)
    );
    return `${differenceInHours} hours`;
  }

  if (differenceInMilliseconds < 604_799_999) {
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return `${differenceInDays} days`;
  }

  if (differenceInMilliseconds < 2_629_745_999) {
    const differenceInMonths = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30)
    );
    return `${differenceInMonths} mo`;
  }

  if (differenceInMilliseconds < 31_556_951_999) {
    const differenceInYears = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)
    );
    return `${differenceInYears} y`;
  }

  if (differenceInMilliseconds > 31_556_951_999) {
    const differenceInYears = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)
    );
    return `${differenceInYears} y`;
  }
}
