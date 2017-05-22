export class AccountMovement {

  private _buchungsDatum: string;
  private _description: string;
  private _disabled: boolean;
  private _movementDate: string;
  private _tag: string;
  private _tagProposal: string;
  private _value: string;
  private _valueAsNumber: string;


  get buchungsDatum(): string {
    return this._buchungsDatum;
  }

  set buchungsDatum(value: string) {
    this._buchungsDatum = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  get movementDate(): string {
    return this._movementDate;
  }

  set movementDate(value: string) {
    this._movementDate = value;
  }

  get tag(): string {
    return this._tag;
  }

  set tag(value: string) {
    this._tag = value;
  }

  get tagProposal(): string {
    return this._tagProposal;
  }

  set tagProposal(value: string) {
    this._tagProposal = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get valueAsNumber(): string {
    return this._valueAsNumber;
  }

  set valueAsNumber(value: string) {
    this._valueAsNumber = value;
  }
}
