export const calculateMonday = () => {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let weekday = date.getDay();

    switch(month) {
        case (0) :
            return day - weekday;
        case (1) :
            return 31 + day - (weekday - 1);
        case (2) :
            return 59 + day - (weekday - 1);
        case (3) :
            return 90 + day - (weekday - 1);
        case (4) :
            return 120 + day - (weekday - 1);
        case (5) :
            return 151 + day - (weekday - 1);
        case (6) :
            return 181 + day - (weekday - 1);
        case (7) :
            return 212 + day - (weekday - 1);
        case (8) :
            return 243 + day - (weekday - 1);
        case (9) :
            return 273 + day - (weekday - 1);
        case (10) :
            return 304 + day - (weekday - 1);
        case (11) :
            return 334 + day - (weekday - 1);
    }
}

export const calculateDays = () => {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let weekday = date.getDay();

    switch(month) {
        case (0) :
            return {
                today: day,
                dayOfWeek: weekday
            }
        case (1) :
            return {
                today: 31 + day,
                dayOfWeek: weekday
            }
        case (2) :
            return {
                today: 59 + day,
                dayOfWeek: weekday
            }
        case (3) :
            return {
                today: 90 + day,
                dayOfWeek: weekday
            }
        case (4) :
            return {
                today: 120 + day,
                dayOfWeek: weekday
            }
        case (5) :
            return {
                today: 151 + day,
                dayOfWeek: weekday
            }
        case (6) :
            return {
                today: 181 + day,
                dayOfWeek: weekday
            }
        case (7) :
            return {
                today: 212 + day,
                dayOfWeek: weekday
            }
        case (8) :
            return {
                today: 243 + day,
                dayOfWeek: weekday
            }
        case (9) :
            return {
                today: 273 + day,
                dayOfWeek: weekday
            }
        case (10) :
            return {
                today: 304 + day,
                dayOfWeek: weekday
            }
        case (11) :
            return {
                today: 334 + day,
                dayOfWeek: weekday
            }
    }
}