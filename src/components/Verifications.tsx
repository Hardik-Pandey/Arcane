import { Verification } from "../types";
import { Switch } from "./Switch";
import DeepClone from '../classes/DeepClone';
import { deepClone as deepCloneV1 } from "../utils/deepClone";
import { clone as deepCloneV2 } from "../utils/deepCloneV2";

interface Props {
  verifications: Verification[];
  onChange: (v: Verification[]) => void;
}

export const Verifications: React.FC<Props> = ({ verifications, onChange }) => {
  const handleChange = (vIndex: number, cIndex: number, value: boolean) => {
    // doesn't work
    // const v = structuredClone(verifications);

    // WORKED but not a good solution
    // const v = JSON.parse(JSON.stringify(verifications));

    // WORKING - custom deep clone function
    // const v = deepCloneV1(verifications);

    // WORKING - got to know about cloneLib & other such functions from https://medium.com/@tiagobertolo/which-is-the-best-method-for-deep-cloning-in-javascript-are-they-all-bad-101f32d620c5
    // const v = DeepClone.cloneLib(verifications, false);
    
    // WORKING - code of cloneLib for debugging
    const v = deepCloneV2(verifications, false);
    // const v = deepCloneV2(verifications, undefined || true); // THIS WILL NOT WORK
    
    console.log('!!!!! verifications => ', verifications);
    v[vIndex].eligibility.checks[cIndex].passed = value;
    console.log('!!!!! v => ', v);
    onChange(v);
  };

  return (
    <>
      {verifications.map((verification, vIndex) => {
        return (
          <div key={vIndex} className="mt-6">
            <div className="text-xs px-3 py-1 bg-white rounded-full mb-1 font-medium text-neutral-400 inline-block">
              {" "}
              Verification Source: {verification.source}
            </div>
            <div className="flex flex-wrap">
              {verification.eligibility.checks.map((condition, cIndex) => {
                return (
                  <div className="p-px w-1/2" key={condition.name}>
                    <div
                      key={condition.name}
                      className="flex flex-col bg-white p-4 rounded-lg"
                    >
                      <p className="text-sm font-medium text-neutral-700 mb-1 -mt-1">
                        {condition.label}
                      </p>
                      <Switch
                        checked={condition.passed}
                        onChange={() => {
                          handleChange(vIndex, cIndex, !condition.passed);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
