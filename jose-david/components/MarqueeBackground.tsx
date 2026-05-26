'use client';

const UNIT  = 'josé david · ';
const TRACK = UNIT.repeat(5);

export default function MarqueeBackground() {
  return (
    <div className="mq-bg" aria-hidden="true">
      <div className="mq-row">
        <span>{TRACK}</span>
        <span aria-hidden="true">{TRACK}</span>
      </div>
    </div>
  );
}
