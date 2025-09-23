export const getShortTime = (duration:any) => {
 if (duration.days() > 0) {
   return `${duration.days()}d`; // For days
 } else if (duration.hours() > 0) {
   return `${duration.hours()}h`; // For hours
 } else if (duration.minutes() > 0) {
   return `${duration.minutes()}m`; // For minutes
 } else {
   return 'Now'; // If within a minute
 }
};