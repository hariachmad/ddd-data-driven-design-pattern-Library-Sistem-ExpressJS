class DateService{
    addDaysToDate(dateString,daysToAdd){
        let date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }

        date.setDate(date.getDate() + daysToAdd);
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    calculateDateDifference(date1, date2) {
        const startDate = new Date(date1);
        const endDate = new Date(date2);
      
        const timeDifference = endDate - startDate;
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
        return Math.abs(Math.round(dayDifference));
      }
}

module.exports= new DateService;