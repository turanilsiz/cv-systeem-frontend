import { Personel } from './personel';
import { Education } from './education';
import { Training } from './training';
import { Certificate } from './certificate';
import { Language } from './language';
import { Work } from './work';
import { Project } from './project';
import { Characteristic } from './characteristic';
import { Expertise } from './expertise';

export class UserCV {
    userId        :number;
    cvLanguage    :string
    personel      :Personel;
    educations    :Education[];
    trainings     :Training[];
    certificates  :Certificate[];
    languages     :Language[];
    works         :Work[];
    projects      :Project[];
    characteristic:Characteristic[]
    expertises    : Expertise[]

    constructor(userId     :number
        ,       cvLanguage :string
        ,       personel   :Personel
        ,       educations :Education[]
        ,       trainings  :Training[]
        ,       certificates :Certificate[]
        ,       languages  : Language[]
        ,       works      :Work[]
        ,       projects   :Project[]
        ,       characteristic:Characteristic[]
        ,       expertises : Expertise[]){
            this.userId     = userId;
            this.cvLanguage = cvLanguage;
            this.personel   = personel;
            this.educations = educations;
            this.trainings  = trainings;
            this.certificates = certificates;
            this.languages  = languages;
            this.works      = works;
            this.projects   = projects
            this.characteristic = characteristic
            this.expertises = expertises

    }




}
