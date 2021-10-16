import styled from "styled-components";

export const HeadlineContainer = styled.div`
  display: flex;
  font-family: "MaisonNeueMedium";
  position: absolute;
  top: 1.2rem;
  right: 2rem;
  align-items: center;
  user-select: none;
  text-shadow: 0px 0px 0.125rem rgba(0, 0, 0, 0.2);
`;

export const Logo = styled.div`
  font-family: "HemiHeadRegular";
  font-size: 1.625rem;
  color: var(--hud-gray);
  margin-left: none;
  transform: translateY(-8%);
`;

export const Stat = styled.div`
  display: flex;
  font-size: 1.1875rem;
  margin-right: 0.9375rem;
`;
export const StatName = styled.div`
  color: var(--hud-gray);
`;
export const StatData = styled.span`
  margin-left: 0.4375rem;
  color: var(--hud-white-gray);
`;

export const GraySpan = styled.span`
  color: var(--hud-gray-span);
  font-size: 0.9375rem;
`;
