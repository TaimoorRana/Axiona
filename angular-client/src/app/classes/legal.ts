import { Resource } from './resource';

export class Legal extends Resource {
    fee_structure: { type: String};
    area_expertise: { type: String};
    schedule_availability: { type: String};
    language: { type: String};
    accept_legal_aid: {type: String};
    region: {type: String};
    name_of_firm: {type: String};
}
