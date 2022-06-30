const durationString = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsPart = Math.floor(seconds % 60);

  if (seconds >= 3600) {
    return `${hours} hours, ${minutes} minutes`;
  } else {
    return `${minutes} minutes, ${secondsPart} seconds`;
  }
};

export default durationString;
