using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using System.Xml;

namespace LectorXml
{
    public partial class Form1 : Form
    {
        private string kk;

        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            OpenFileDialog buscar = new OpenFileDialog();
            string extension;

            if(buscar.ShowDialog() == DialogResult.OK)
            {
                extension = Path.GetExtension(buscar.FileName);
                if(extension==".xml")
                {
                    textBox1.Text = buscar.FileName;
                }
                else
                {
                    MessageBox.Show("Archivo Incorrecto");
                }
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string umldiagrams = "umldiagrams";
            string UMLClassDiagram = "UMLClassDiagram";
            string UMLClass = "UMLClass";
            string superitem = "superitem";
            string UMLAssociation = "UMLAssociation";
            string point = "point";
            string UMLGeneralization = "UMLGeneralization";
            string valueAst = "value=\"*\"";
            string valueUno = "value=\"1\"";
            string valueNulo = "value=\"\"";
            char quitalo = '+';
            char quitalo2 = ':';
            char quitalo3 = '_';
            char quitalo4 = '#';

            string line;

            string NewXml = "";
            StreamReader seCargoXml = new StreamReader(textBox1.Text);
            
            while ((line = seCargoXml.ReadLine()) != null)
            {
                if (line.Contains(UMLClassDiagram)
                    || line.Contains(superitem) || line.Contains(UMLAssociation)
                    || line.Contains(point) || line.Contains(UMLGeneralization)
                    || line.Contains(valueAst) || line.Contains(valueUno)
                    || line.Contains(valueNulo) || line.Contains(UMLClass))
                {
                }
                else
                {
                    if (line.Contains(quitalo))
                    {
                        line = line.Replace("+", "");
                    }
                    if (line.Contains(quitalo2))
                    {
                        line = line.Replace(":", " ");
                    }
                    if (line.Contains(quitalo3))
                    {
                        line = line.Replace("_", "");
                    }
                    if (line.Contains(quitalo4))
                    {
                        line = line.Replace("#", "");
                    }
                    NewXml += line;
                    richTextBox1.Text = NewXml;
                }
            } 
            seCargoXml.Close();
            Console.WriteLine(NewXml);
            string NewXml1 = @"<?xml version=""1.0"" ?>" + NewXml;
            /*DataSet ds = new DataSet();
            string NewXml1 = @"<?xml version=""1.0"" encoding=""UTF - 8""?>" + NewXml;
            XmlTextReader reader = new XmlTextReader(new StringReader(NewXml1));
            ds.ReadXml(reader);*/

            XmlDocument xDoc = new XmlDocument();
            //xDoc.Load(NewXml);
            XmlTextReader reader = new XmlTextReader(new StringReader(NewXml));
            /*XmlNodeList UmlClass = xDoc.GetElementsByTagName("umldiagrams");
            XmlNodeList Class =  ((XmlElement)UmlClass[0]).GetElementsByTagName("item");

            foreach(XmlElement nodo in Class)
            {
                string clase = nodo.GetAttribute("id");
                string atributo = nodo.GetAttribute("value");
                Console.WriteLine(clase);
                Console.WriteLine(atributo);
            }*/
            /*using (StringWriter writer = new StringWriter())
            {
                string indentado = null; //para alamcenar los tabs
                while (reader.Read())
                {
                    //asignándole la indentación respectiva
                    indentado = new string('\t', reader.Depth);

                    //verificamos si es un tipo de nodo Elemento
                    if (reader.NodeType == XmlNodeType.Element)
                    {

                        //si es que tiene atributos
                        if (reader.HasAttributes)
                            writer.WriteLine("{0}<{1}/>", indentado, reader.LocalName);
                        else

                            //indentamos y asignamos el nombre el elemento(esto no incluye el prefijo)
                            writer.WriteLine("{0}<{1}>", indentado, reader.LocalName);
                    }

                    //verificamos si es un tipo de nodo de fin del elemento 
                    else if (reader.NodeType == XmlNodeType.EndElement)
                    {
                        //indentamos y asignamos el nombre el elemento(esto si incluye el prefijo, 
                        //pero como no existe algun prefijo definido, entonces da igual que localName)
                        writer.WriteLine("{0}</{1}>", indentado, reader.Name);
                    }
                }

                //cerramos el reader
                reader.Close();
                //creamos una variable que almacenara los resultados
                string StringBuffer = writer.ToString();
                //imprimimos resultados
                Console.Write(StringBuffer);
                richTextBox2.Text = StringBuffer;
            }*/
            using (System.IO.StringWriter writer = new System.IO.StringWriter())
            {
                while (reader.Read())
                {
                    //cadena que almacenará la indentación
                    string indentado = new string('\t', reader.Depth);
                    //evaluando el tipo de nodo
                    switch (reader.NodeType)
                    {
                        //si tipo de nodo es: <?xml version='1.0' encoding='ISO-8859-1'?>
                        case XmlNodeType.XmlDeclaration:
                            //usamos Value para imprimir "xml version='1.0' encoding='ISO-8859-1'"
                            writer.WriteLine("<?{0}?>", reader.Value);
                            break;
                        //if el tipo de nodo es un comentario
                        case XmlNodeType.Comment:
                            writer.WriteLine("{0}<!--{1}-->", indentado, reader.Value);
                            break;
                        //si tipo de nodo es elemento
                        case XmlNodeType.Element:
                            {
                                //y si tiene atributos
                                if (reader.HasAttributes)
                                {
                                    //entonces creamos una cadena "atributos" que guardará
                                    //los atributos de este nodo.
                                    string atributos = null;
                                    string clase = null;
                                    for (int i = 0; i < reader.AttributeCount; i++)
                                    {
                                        //nos movemos para realizar la lectura del atrbiuto de acuerdo al índice.
                                        reader.MoveToAttribute(i);
                                        //una vez que estamos ubicados en la posición correcta,
                                        //leemos el nombre del atributo, como también el valor.
                                        //atributos += " " + reader.Name + "='" + reader.Value + "'";
                                        if(i==1)
                                        {
                                                clase += reader.Value;
                                                writer.WriteLine("{0}<clase>{1}</clase>", indentado, clase);  
                                        }
                                        if (i==0&&reader.Name!="id")
                                        {
                                            
                                            atributos += reader.Value;
                                            writer.WriteLine("{0}<atributo>{1}</atributo>", indentado, atributos);
                                        }
                                    }
                                    //despues de haber leido los atributos del elemento...
                                    //moveremos el puntero al elemento.
                                    reader.MoveToElement();
                                    //visuali
                                    //writer.WriteLine("{0}<{1}/>", indentado,atributos);
                                    
                                    
                                } 
                                else
                                {
                                    //si la profundidad del nodo es diferente a 2
                                    if (reader.Depth != 2)
                                        writer.WriteLine("{0}<{1}>", indentado, reader.LocalName);
                                    else
                                        writer.Write("{0}<{1}>", indentado, reader.LocalName);
                                }
                            }
                            break;
                        //if el tipo de nodo es contenido.
                        case XmlNodeType.Text:
                            //imprimimos el contenido.
                            writer.Write(reader.Value);
                            break;
                        //si el tipo de nodo es un elemento final o de cierre.
                        case XmlNodeType.EndElement:
                            //y además, averiguamos si es el que Depth es 2 entonces 
                            //no le agregamos la indentación, imprimiendo de esta manera: 
                            //<title>XML Programming</title> en vez de <title>XML Programming        </title>
                            if (reader.Depth == 2)
                                writer.WriteLine("</{0}>", reader.LocalName);
                            else
                                //con indentación tabPrefix
                                writer.WriteLine("{0}</{1}>", indentado, reader.LocalName);
                            break;
                    }
                }
                //cerramos el reader
                reader.Close();
                //mostrar los resultados.
                Console.Write(writer.ToString());
                richTextBox2.Text = writer.ToString();
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {

        }
    }
}
