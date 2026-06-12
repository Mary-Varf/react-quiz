import { useActionState } from "react";
import cls from "./AddQuestionPage.module.css";
import { Button } from "../../components/Button";
import { delayFn } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";

const LEVEL_OPTIONS = [
  { value: 1, text: "1 - easiest" },
  { value: 2, text: "2 - medium" },
  { value: 3, text: "3 - hardest" },
];

const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn();
    const data = Object.fromEntries(formData);
    const resources = data.resources.trim();
    const isClearForm = data.clearForm;

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: data.question,
        answer: data.answer,
        description: data.description,
        resources: resources.length ? resources.split(",") : [],
        level: +data.level,
        completed: false,
        editDate: undefined,
      }),
    });
    if (response.status === 404) {
      toast.error(response.statusText);
      throw new Error(response.statusText);
    }
    const question = response.json();
    toast.success("New question is successfully created");
    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error);
    return {};
  }
};

export const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, {
    clearForm: true,
  });
  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.formTitle}>Add new question</h1>
      <form action={formAction} className={cls.formContiner}>
        <div className={cls.formControl}>
          <label htmlFor="questionField">Question:</label>
          <textarea
            name="question"
            id="questionField"
            cols="30"
            rows="2"
            required
            placeholder="Please enter question"
            defaultValue={formState?.question}
          ></textarea>
        </div>

        <div className={cls.formControl}>
          <label htmlFor="shortAnswerField">Short Answer:</label>
          <textarea
            name="answer"
            id="shortAnswerField"
            cols="30"
            rows="2"
            required
            placeholder="Please enter short anser"
            defaultValue={formState?.answer}
          ></textarea>
        </div>

        <div className={cls.formControl}>
          <label htmlFor="descriptionField">Description:</label>
          <textarea
            name="description"
            id="descriptionField"
            cols="30"
            rows="5"
            required
            placeholder="Please enter description"
            defaultValue={formState?.description}
          ></textarea>
        </div>

        <div className={cls.formControl}>
          <label htmlFor="resourcesField">Resources:</label>
          <textarea
            name="resources"
            id="resourcesField"
            cols="30"
            rows="3"
            placeholder="Please enter resources separated by commas"
            defaultValue={formState?.resources}
          ></textarea>
        </div>

        <div className={cls.formControl}>
          <label htmlFor="levelField">Level:</label>
          <select name="level" id="levelField">
            <option disabled>Question level</option>
            {LEVEL_OPTIONS.map((el) => (
              <option key={el.value} value={el.value}>
                {el.text}
              </option>
            ))}
          </select>
        </div>

        <div className={cls.formControl}>
          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultChecked={formState?.clearForm && true}
              className={cls?.checkbox}
            />
            <span>Clear form after submitting?</span>
          </label>
        </div>

        <Button isDisabled={isPending}>Add question</Button>
      </form>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam culpa,
        voluptatibus dolores explicabo corporis nisi corrupti dolorem et autem
        natus reprehenderit facere cupiditate accusantium. Debitis, perferendis
        maiores similique a velit nam adipisci molestiae laborum totam numquam
        sed sint alias quae repellat necessitatibus earum deleniti dolores magni
        ea obcaecati eligendi incidunt. Quasi esse veritatis reprehenderit
        facilis aut eaque eos quia tempora. Quae ipsam veniam esse modi, maxime
        suscipit sunt odio labore et delectus nesciunt soluta inventore a quod
        veritatis sapiente fuga facilis? Vel officiis id laborum voluptas ad
        deleniti. Deleniti harum blanditiis tenetur odio, libero tempora
        provident sed, unde, repellendus esse quia eum? Illum incidunt dolore
        consequatur nobis ducimus! Pariatur autem reprehenderit, aliquam
        deserunt odio dolorem veniam vero sit labore, iure culpa consequuntur
        officia illo et rem dolorum eius! Hic minima sed itaque ex ullam eum
        dolorem voluptates a quae consequatur incidunt officia rem, amet rerum
        at eius magnam sunt, quas neque blanditiis magni veritatis cupiditate.
        Eveniet eaque nam alias! Cum laudantium, est magni aliquam at saepe eos
        vero hic exercitationem ea nam natus quas. Ea impedit ullam,
        necessitatibus quisquam quae expedita id provident distinctio
        voluptatibus. At perferendis nostrum asperiores accusantium voluptatum
        maiores minima aut dolor. Cupiditate inventore vel voluptatibus quod cum
        enim dicta maxime ducimus aliquid assumenda? Dolore quibusdam neque
        blanditiis voluptatibus incidunt alias excepturi? Velit rem eveniet quo
        voluptatum, numquam quas itaque ad vel repellat sunt facere perspiciatis
        ipsum odit debitis similique voluptas fugiat perferendis asperiores ipsa
        quibusdam? Ratione in nulla ut et rem, voluptate facilis provident ad
        unde iusto accusantium sunt sed beatae facere aut eaque aliquid
        repudiandae ducimus recusandae qui, aspernatur mollitia vitae tenetur
        quia. Eos reprehenderit enim doloribus in. Delectus aliquid doloribus,
        nulla impedit natus sint saepe consectetur hic maxime repudiandae
        praesentium officiis consequuntur est, velit quos placeat iste. Qui
        autem incidunt, odio animi laborum omnis ipsam nisi sed veniam. Commodi
        excepturi quisquam natus aut nemo ut doloribus soluta cupiditate
        asperiores possimus. Corrupti, cum doloremque laboriosam minus accusamus
        inventore quaerat aperiam in vitae quas itaque, beatae autem atque
        asperiores voluptate debitis, repellendus amet dolor odit vel odio
        assumenda. Enim doloribus maiores minima inventore quo nihil vel
        voluptates, totam odit. Quisquam inventore beatae quae suscipit ad?
        Libero debitis eaque provident consequatur esse similique consequuntur.
        In aut optio delectus, doloribus consequuntur, magnam sit magni quas
        sunt omnis fugit. Porro voluptates illum qui debitis, molestias
        corrupti, dignissimos aperiam quaerat, necessitatibus error quae et
        fuga? Fugit libero distinctio temporibus cum blanditiis architecto
        ducimus impedit in numquam! Id nesciunt praesentium nostrum dignissimos
        qui doloribus quae modi nulla enim amet quam, aperiam et dolorum
        perferendis error similique earum, explicabo tenetur inventore maxime ex
        voluptatum ea iure ratione. Vel iste, dicta consectetur inventore facere
        ea ratione ipsa culpa aut quidem eveniet commodi, laudantium ad? Autem
        eligendi explicabo reiciendis non ut. Sed dolores numquam non reiciendis
        maiores veritatis qui, velit repellat itaque unde aliquid nemo
        aspernatur id. Excepturi distinctio veritatis cum optio eaque,
        necessitatibus atque ad, nihil tempore earum accusantium possimus,
        numquam rerum cumque ab vero beatae impedit. Odio exercitationem qui
        suscipit minima aspernatur commodi, nostrum ab cum doloribus non
        quibusdam repellat in architecto ut pariatur ex tempore a! Sapiente,
        quas ut! Recusandae dignissimos temporibus voluptas cupiditate, suscipit
        reiciendis placeat dolore qui ad culpa magni iure provident. Nesciunt,
        quam odit aspernatur natus atque pariatur porro nulla velit, nam,
        praesentium in itaque quia adipisci quidem dolor a sit saepe at alias
        laboriosam molestias facilis? Molestias asperiores quidem quia aut
        aliquam laborum vel eaque ea. Unde cupiditate totam ea in delectus, eos
        sit aspernatur ex voluptas magnam veniam ad, harum quia vitae,
        reiciendis quasi recusandae aperiam corrupti quis minima officia. Labore
        doloremque ullam totam odit debitis excepturi incidunt, nisi cupiditate
        ratione mollitia dignissimos recusandae molestias ut veniam culpa ipsum
        vero, fuga assumenda placeat ipsa quae molestiae. Excepturi ducimus ad
        id commodi, illum earum cupiditate voluptatum placeat distinctio
        delectus libero architecto! Officia laboriosam doloremque odio
        accusantium perferendis dolore id, totam, libero deserunt corrupti non
        necessitatibus, vero magni eligendi quas temporibus labore odit expedita
        eius aspernatur a quo excepturi assumenda voluptas! Vitae ducimus
        aspernatur consequatur, facere dignissimos commodi libero nisi a dolore
        esse deserunt dicta blanditiis voluptate ipsam iusto rem reiciendis
        autem! Quia non, magnam ullam perferendis, repudiandae nihil qui aliquam
        at eaque quam, blanditiis cupiditate itaque a harum quidem mollitia ad?
        Excepturi repudiandae, laudantium minus quos deleniti magnam fugit
        voluptates id provident ipsum perspiciatis illo tempore. Corrupti
        voluptate, non eius inventore voluptates ex officia. Deleniti vel atque
        accusamus dicta architecto tempora voluptates. Dolore quisquam, error
        nostrum maxime distinctio quae nisi delectus incidunt enim aspernatur
        iure saepe. Ipsa molestiae voluptas sequi, similique quas temporibus
        odio voluptate aliquam, numquam quasi, saepe sed perspiciatis? Accusamus
        fugit odit nostrum cupiditate rerum facere sequi nemo distinctio optio
        temporibus laudantium laboriosam quam inventore blanditiis fuga iure
        nulla ex suscipit qui, sint cumque hic illo! Veritatis repellendus quos
        ratione fuga voluptas ipsa accusantium culpa enim vel quas nulla ad,
        odit magni perspiciatis, animi iusto, harum doloremque natus eaque
        praesentium? Cumque quaerat consequuntur quidem vero earum aliquid
        sapiente? Laboriosam iure corrupti deleniti voluptas esse dolores
        temporibus, rerum vel! Natus architecto facilis quibusdam aliquid? Ipsam
        suscipit nostrum, est harum dolor, quos accusantium praesentium dolores
        alias rerum magnam placeat reiciendis et, hic consequatur accusamus
        consequuntur dolore tempora qui nihil eum aperiam! Obcaecati illo ipsam
        quas delectus sit veritatis assumenda modi, blanditiis dolore alias
        natus maxime excepturi temporibus pariatur, ea eos ut laborum inventore
        accusamus ad reiciendis recusandae placeat? Similique a modi unde
        voluptatum voluptas ducimus rerum, animi, tempore laboriosam amet
        aspernatur consectetur molestiae impedit iusto adipisci alias. Amet eius
        autem repellendus voluptates temporibus repellat iure culpa cumque
        beatae similique earum nobis dolorum reiciendis, placeat harum molestias
        eaque sint? Necessitatibus assumenda enim autem officia sit tempora
        tempore fuga neque optio tenetur et omnis amet quia beatae, nulla
        aspernatur vero maiores deleniti porro velit nam nostrum eos doloremque
        alias. Autem eaque saepe delectus recusandae harum cum dolores,
        doloremque quam atque voluptas ad. Quasi, nostrum qui quaerat magni
        repellendus explicabo necessitatibus consequatur totam quibusdam earum
        molestiae sit vitae voluptatem expedita in modi quod! Aliquid quos
        possimus repellat molestias deleniti neque quaerat inventore, est ipsam
        molestiae dolorem autem nam dicta harum, odio illo provident facere
        ipsa, perspiciatis nobis reiciendis maiores magnam! Est aspernatur
        distinctio voluptatibus modi eum, perferendis facere molestias ducimus
        eaque illo consequuntur sapiente nihil molestiae voluptas, in sit
        doloremque totam voluptates magni repellat expedita. Laboriosam facilis
        odio molestiae iusto veritatis nesciunt corporis odit, laudantium ab.
        Facilis vero placeat commodi ex modi. Mollitia, labore delectus
        dignissimos accusamus accusantium pariatur voluptatem enim dicta
        eligendi cumque ipsum atque quasi similique explicabo alias omnis
        commodi ullam a ipsam doloremque. Necessitatibus nulla ut quidem iste
        quis id aliquam minima magnam delectus quaerat. Quidem, culpa. Iusto
        omnis aliquam modi quo assumenda? Obcaecati ipsa nobis earum qui amet!
        Numquam, nobis est. Labore, sit necessitatibus accusamus aliquid nulla
        vitae commodi praesentium quia quisquam a ea culpa! Quis sint
        exercitationem delectus suscipit repellendus. Nesciunt ratione rerum
        ipsam enim consequatur pariatur unde sit dolor cumque doloremque
        deleniti ad error nemo fugiat, accusantium rem? In officiis molestias
        impedit eaque, ipsum iure aspernatur provident veritatis, deleniti
        sapiente autem iste! Voluptatum ducimus porro repudiandae laborum fuga
        nihil adipisci provident velit debitis aliquid nobis totam quibusdam,
        magnam aut quasi asperiores earum eum. Architecto possimus eaque quasi
        non iusto vero quibusdam facilis consectetur numquam at adipisci natus
        accusantium quam soluta, amet fugit nostrum excepturi ex? Repellendus
        maxime similique laborum ipsam officia perferendis praesentium, eos
        nesciunt tenetur nisi obcaecati labore a quos velit eius adipisci vitae
        debitis facilis reprehenderit soluta, cumque, earum distinctio.
        Mollitia, distinctio totam aliquam vitae in natus maxime ut labore dicta
        necessitatibus nulla ab nisi. Veritatis ipsam consequatur explicabo
        incidunt. Exercitationem doloribus saepe odit illo dolorem placeat neque
        ullam, blanditiis dolores asperiores vitae eum voluptate corrupti? Sed
        tenetur, perferendis fuga eveniet ullam est velit voluptates molestias,
        nesciunt animi harum. Temporibus tempore placeat odio sequi nulla
        numquam voluptates, necessitatibus delectus laboriosam enim dolorem
        architecto ea? Voluptatem, in sequi. Quisquam omnis perferendis porro
        magni reprehenderit deserunt quam animi culpa recusandae, temporibus
        quos consectetur laboriosam accusamus ad? Harum nam repellendus optio
        blanditiis velit ea nesciunt pariatur voluptatibus ducimus iusto
        corrupti illum labore distinctio vero, illo magnam facilis ut ipsum
        consectetur quam minima tenetur et quia laudantium. Optio, libero.
        Corrupti dolores, quidem tempore in magnam explicabo odit voluptate
        tenetur saepe voluptatum nemo sint mollitia? Ad esse sunt ut voluptates
        eos harum, sit eveniet placeat quisquam est rem excepturi delectus error
        quia, pariatur perspiciatis fugit quod saepe repellat quibusdam,
        obcaecati aliquid soluta qui rerum. Numquam deserunt, odit facere
        sapiente obcaecati dicta, alias repudiandae dolorum quia perferendis sed
        qui. Ipsam quidem iure tempora illum et fugit eos itaque, sint
        veritatis, error dolores exercitationem dicta officia? Nihil dolorem et
        saepe neque tenetur, ab voluptate eos laborum, necessitatibus sed quos
        quidem, amet quis placeat ex nostrum suscipit. Accusamus velit esse
        quisquam officiis dolor ratione eligendi non necessitatibus eaque quae
        amet optio excepturi deleniti, adipisci veritatis? Quae praesentium
        repellendus vero cupiditate, inventore nesciunt ex autem eaque voluptate
        consectetur numquam neque tenetur a quasi. Culpa modi voluptatum natus
        placeat et, reiciendis maxime recusandae, suscipit qui quisquam nobis,
        saepe ducimus illo eaque adipisci?
      </p>
    </>
  );
};

export default AddQuestionPage;
